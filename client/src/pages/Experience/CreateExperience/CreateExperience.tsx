import { useState, useEffect, useCallback } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useHistory, useLocation, useRouteMatch, Switch, Route } from 'react-router-dom';

import { useLanguageContext } from 'context/languageContext';
import useLanguages from 'hooks/useLanguages';
import useCreationReducer from './creationReducer';
import type { StringField, BooleanField, NumberField } from './creationReducer';

import { CSSTransition } from 'react-transition-group';
import Spinner from 'components/Spinner/Spinner';
import StripeRedirect from 'pages/Creator/StripeRedirect/StripeRedirect';
import Layout from './Layout';
import * as Slides from '../BuilderSlides';

import { makeStyles } from '@material-ui/core/styles';
import styles from './CreateExperience.styles';
const useStyles = makeStyles(styles);

const GET_STRIPE_INFO = gql`
    query getStripeInfo {
        me {
            creator {
                _id
                stripeProfile {
                    onboarded
                }
            }
        }
    }
`;

const GET_LOCATIONS = gql`
    query getLocations {
        experiences {
            location
        }
    }
`;

type StripeInfoQuery = {
    creator: {
        _id: string;
        stripeProfile: { onboarded: boolean };
    }
}

type LocationQuery = { location: string; }[];

const CreateExperience = () => {
    const { CreateExperience: text } = useLanguageContext().appText;
    const languageList = useLanguages();
    const classes = useStyles();

    const history = useHistory();
    const location = useLocation();
    const { path } = useRouteMatch();

    const [animationIn, setAnimationIn] = useState(false);
    const [animationDone, setAnimationDone] = useState(false);

    useEffect(() => {
        // Start animation on mounting
        // setAnimationIn(false);
        // TODO: Put the animation back in
        setAnimationIn(true);

        // After 2 seconds start fade out
        const animationStartTimer = setTimeout(() => {
            setAnimationIn(false);
        }, 2000);
        // After 3 seconds, hide the animation slide
        const animationDoneTimer = setTimeout(() => {
            setAnimationDone(true);
        }, 3000);

        return () => {
            clearTimeout(animationStartTimer);
            clearTimeout(animationDoneTimer);
        }
     }, []);

    const { 
        data: stripeData, 
        loading: loadingStripeData 
    } = useQuery<{ me: StripeInfoQuery }>(GET_STRIPE_INFO);

    // Use existing locations for location autocomplete
    const {
        data: locationData,
        loading: loadingLocationData
    } = useQuery<{ experiences: LocationQuery }>(GET_LOCATIONS);

    const [state, dispatch] = useCreationReducer();
    const handleStringValueChange = useCallback((field: StringField, value: string) => {
        dispatch({ type: 'SET_STRING_FIELD', field, value });
    }, [dispatch]);
    const handleBooleanValueChange = useCallback((field: BooleanField, value: boolean) => {
        dispatch({ type: 'SET_BOOLEAN_FIELD', field, value });
    }, [dispatch]);
    const handleNumberValueChange = useCallback((field: NumberField, value: number) => {
        dispatch({ type: 'SET_NUMBER_FIELD', field, value });
    }, [dispatch]);
    const handleFieldValidity = useCallback((value: boolean) => {
        dispatch({ type: 'SET_CAN_CONTINUE', value });
    }, [dispatch]);

    // Every time the step changes, go to that slide
    useEffect(() => {
        history.push(`/experience/new/${state.currentStep}`);
    }, [state.currentStep, history]);
    
    if (loadingStripeData || !stripeData || loadingLocationData || !locationData) {
        return <Spinner />;
    }

    const creatorId = stripeData.me.creator._id;
    const onboardedWithStripe = stripeData.me.creator.stripeProfile.onboarded;

    // If creator hasn't completed the Stripe onboarding, let them try again
    if (!onboardedWithStripe) {
        return <StripeRedirect creatorId={creatorId} />
    }

    if (animationDone) {
        return (
            <Layout 
            stepsCompleted={state.stepsCompleted} 
            currentStepIdx={state.currentStepIdx}
            canContinue={state.canContinue}
            onNext={() => dispatch({ type: 'GO_TO_NEXT_STEP' })}
            onBack={() => dispatch({ type: 'GO_TO_PREV_STEP' })}
            onNavigate={stepIdx => dispatch({ type: 'GO_TO_STEP', stepIdx })}>
                <Switch location={location}>
                    <Route path={`${path}/location`}>
                        <Slides.Location
                        isOnlineExperience={state.form.isOnlineExperience}
                        onSelectType={val => handleBooleanValueChange('isOnlineExperience', val)}
                        storedLocations={[ ...new Set(locationData.experiences.map(({ location }) => 
                            location
                        ))]}
                        location={state.form.location}
                        onLocationChange={val => handleStringValueChange('location', val)}
                        meetingPoint={state.form.meetingPoint}
                        onMeetingPointChange={val => handleStringValueChange('meetingPoint', val)}
                        zoomPMI={state.form.zoomMeetingId}
                        onZoomPMIChange={val => handleStringValueChange('zoomMeetingId', val)}
                        zoomPassword={state.form.zoomMeetingPassword}
                        onZoomPasswordChange={val => handleStringValueChange('zoomMeetingPassword', val)}
                        onSlideComplete={handleFieldValidity} />
                    </Route>
                    <Route path={`${path}/title`}>
                        <Slides.Title
                        title={state.form.title}
                        onTitleChange={val => handleStringValueChange('title', val)}
                        onSlideComplete={handleFieldValidity} />
                    </Route>
                    <Route path={`${path}/category`}>
                        <Slides.Category
                        categories={state.form.categories}
                        onSelectCategory={(value, remove) => {
                            dispatch({
                                type: 'SET_CATEGORY',
                                value,
                                remove
                            });
                        }}
                        onSlideComplete={handleFieldValidity} />
                    </Route>
                    <Route path={`${path}/planning`}>
                        <Slides.Planning
                        planning={state.form.planning} 
                        onPlanningChange={val => handleStringValueChange('planning', val)}
                        onSlideComplete={handleFieldValidity} />
                    </Route>
                    <Route path={`${path}/duration`}>
                        <Slides.Duration
                        duration={state.form.duration}
                        onDurationChange={val => handleNumberValueChange('duration', val)}
                        onSlideComplete={handleFieldValidity} />
                    </Route>
                    <Route path={`${path}/language`}>
                        <Slides.Language
                        languageList={languageList}
                        languages={state.form.languages}
                        onLanguagesChange={value => {
                            dispatch({ type: 'SET_LANGUAGES', value });
                        }}
                        onSlideComplete={handleFieldValidity} />
                    </Route>
                    <Route path={`${path}/capacity`}>
                        <Slides.Capacity />
                    </Route>
                </Switch>
            </Layout>
        );
    } else { // Show start animation
        return (
            <CSSTransition
            in={animationIn}
            timeout={1000}
            unmountOnExit
            classNames={{
                exit: classes.fadeExit,
                exitActive: classes.fadeExitActive
            }}>
                <div className={classes.container}>
                    <h2 className={classes.title}>{text.animationTitle1}</h2>
                    <h2 className={classes.title}>{text.animationTitle2}</h2>
                </div>
            </CSSTransition>
        );
    }
}

export default CreateExperience;