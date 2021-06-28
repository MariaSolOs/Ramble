import { useState, useEffect, useCallback } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useHistory, useLocation, useRouteMatch, Switch, Route } from 'react-router-dom';
import type { EventInput } from '@fullcalendar/react';

import { useLanguageContext } from 'context/languageContext';
import useLanguages from 'hooks/useLanguages';
import useCreationReducer from './creationReducer';
import type { StringField, BooleanField, NumberField, ArrayField } from './creationReducer';

import Div100vh from 'react-div-100vh';
import { CSSTransition } from 'react-transition-group';
import Spinner from 'components/Spinner/Spinner';
import StripeRedirect from 'pages/Creator/StripeRedirect/StripeRedirect';
import Layout from './Layout';
import * as Slides from '../BuilderSlides';

import { makeStyles } from '@material-ui/core/styles';
import styles from './CreateExperience.styles';
const useStyles = makeStyles(styles);

const GET_CREATOR_INFO = gql`
    query getStripeInfo {
        me {
            firstName
            photo
            creator {
                _id
                bio
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

type CreatorInfoQuery = {
    firstName: string;
    photo: string;
    creator: {
        _id: string;
        bio: string;
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
        data: creatorData, 
        loading: loadingCreatorData 
    } = useQuery<{ me: CreatorInfoQuery }>(GET_CREATOR_INFO, {
        onError: () => history.replace('/')
    });

    // Use existing locations for location autocomplete
    const {
        data: locationData,
        loading: loadingLocationData
    } = useQuery<{ experiences: LocationQuery }>(GET_LOCATIONS, {
        onError: () => history.replace('/')
    });

    // Form management
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

    const handleArrayValueChange = useCallback((field: ArrayField, value: string[] | EventInput[]) => {
        dispatch({ type: 'SET_ARRAY_FIELD', field, value });
    }, [dispatch]);

    const handleFieldValidity = useCallback((value: boolean) => {
        dispatch({ type: 'SET_CAN_CONTINUE', value });
    }, [dispatch]);

    // Every time the step changes, go to that slide
    useEffect(() => {
        history.push(`/experience/new/${state.currentStep}`);
    }, [state.currentStep, history]);

    const handleSubmit = () => {
        
    }
    
    if (loadingCreatorData || !creatorData || loadingLocationData || !locationData) {
        return <Spinner />;
    }

    const creatorId = creatorData.me.creator._id;
    const onboardedWithStripe = creatorData.me.creator.stripeProfile.onboarded;

    // If creator hasn't completed the Stripe onboarding, let them try again
    if (!onboardedWithStripe) {
        return <StripeRedirect creatorId={creatorId} />
    }

    if (animationDone) {
        return (
            <Layout 
            stepsCompleted={state.stepsCompleted} 
            currentStepIdx={state.currentStepIdx}
            currentStep={state.currentStep}
            canContinue={state.canContinue}
            onNavigate={stepIdx => dispatch({ type: 'GO_TO_STEP', stepIdx })}
            onBack={() => dispatch({ type: 'GO_TO_PREV_STEP' })}
            onNext={
                state.currentStep === 'review' ?
                handleSubmit : () => dispatch({ type: 'GO_TO_NEXT_STEP' })
            }>
                <Switch location={location}>
                    <Route path={`${path}/setting`}>
                        <Slides.Setting
                        isOnlineExperience={state.form.isOnlineExperience}
                        onSelectType={val => handleBooleanValueChange('isOnlineExperience', val)}
                        onSlideComplete={handleFieldValidity} />
                    </Route>
                    <Route path={`${path}/location`}>
                        <Slides.Location
                        storedLocations={[ ...new Set(locationData.experiences.map(({ location }) => 
                            location
                        ))]}
                        isOnlineExperience={state.form.isOnlineExperience!}
                        location={state.form.location}
                        meetingPoint={state.form.meetingPoint}
                        zoomPMI={state.form.zoomMeetingId}
                        zoomPassword={state.form.zoomMeetingPassword}
                        onLocationChange={val => handleStringValueChange('location', val)}
                        onMeetingPointChange={val => handleStringValueChange('meetingPoint', val)}
                        onZoomPMIChange={val => handleStringValueChange('zoomMeetingId', val)}
                        onZoomPasswordChange={val => handleStringValueChange('zoomMeetingPassword', val)}
                        setCoordinates={(lat, long) => {
                            handleNumberValueChange('latitude', lat);
                            handleNumberValueChange('longitude', long);
                        }}
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
                        onLanguagesChange={val => handleArrayValueChange('languages', val)}
                        onSlideComplete={handleFieldValidity} />
                    </Route>
                    <Route path={`${path}/capacity`}>
                        <Slides.Capacity
                        capacity={state.form.capacity}
                        onCapacityChange={val => handleNumberValueChange('capacity', val)}
                        onSlideComplete={handleFieldValidity} />
                    </Route>
                    <Route path={`${path}/age`}>
                        <Slides.AgeRequirements
                        isAgeRestricted={state.form.isAgeRestricted}
                        ageRequired={state.form.ageRequired}
                        onAgeRestrictionChange={val => handleBooleanValueChange('isAgeRestricted', val)}
                        onAgeRequiredChange={val => handleNumberValueChange('ageRequired', val)}
                        onSlideComplete={handleFieldValidity} />
                    </Route>
                    <Route path={`${path}/preview`}>
                        <Slides.Preview
                        images={state.form.images}
                        onSlideComplete={handleFieldValidity}
                        onImageChange={(index, value) => {
                            dispatch({ type: 'SET_IMAGE_FILE', index, value });
                        }} />
                    </Route>
                    <Route path={`${path}/included`}>
                        <Slides.IncludedItems
                        items={state.form.included}
                        onItemsChange={val => handleArrayValueChange('included', val)}
                        onSlideComplete={handleFieldValidity} />
                    </Route>
                    <Route path={`${path}/toBring`}>
                        <Slides.ToBringItems
                        items={state.form.toBring}
                        onItemsChange={val => handleArrayValueChange('toBring', val)}
                        onSlideComplete={handleFieldValidity} />
                    </Route>
                    <Route path={`${path}/price`}>
                        <Slides.Pricing
                        pricePerPerson={state.form.pricePerPerson}
                        privatePrice={state.form.privatePrice}
                        currency={state.form.currency}
                        capacity={state.form.capacity}
                        onPricePerPersonChange={val => handleNumberValueChange('pricePerPerson', val)}
                        onPrivatePriceChange={val => handleNumberValueChange('privatePrice', val)}
                        onCurrencyChange={val => handleStringValueChange('currency', val)}
                        onSlideComplete={handleFieldValidity} />
                    </Route>
                    <Route path={`${path}/availabilities`}>
                        <Slides.Availabilities
                        slots={state.form.slots!}
                        duration={state.form.duration}
                        onSlotsChange={val => handleArrayValueChange('slots', val)}
                        onSlideComplete={handleFieldValidity} />
                    </Route>
                    <Route path={`${path}/review`}>
                        <Slides.Review
                        form={state.form}
                        creator={{
                            name: creatorData.me.firstName,
                            photo: creatorData.me.photo,
                            bio: creatorData.me.creator.bio
                        }}
                        onSlideComplete={handleFieldValidity} />
                    </Route>
                </Switch>
            </Layout>
        );
    } else { // Show start animation
        return (
            <Div100vh>
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
            </Div100vh>
        );
    }
}

export default CreateExperience;