import { useState, useEffect, useCallback } from 'react';
import { 
    useHistory, 
    useLocation, 
    useRouteMatch, 
    Switch, 
    Route, 
    Prompt 
} from 'react-router-dom';
import type { EventInput } from '@fullcalendar/react';

import { 
    useGetLocationsQuery, 
    useCreateExperienceMutation, 
    useGetCreationProfileQuery 
} from 'graphql-api';
import { useLanguageContext } from 'context/languageContext';
import useLanguages from 'hooks/useLanguages';
import { useAppDispatch } from 'hooks/redux';
import { openErrorDialog } from 'store/uiSlice';
import useCreationReducer from './useCreationReducer';
import type { StringField, BooleanField, NumberField, ArrayField } from './useCreationReducer';

import Div100vh from 'react-div-100vh';
import { CSSTransition } from 'react-transition-group';
import Spinner from 'components/Spinner/Spinner';
import StripeRedirect from 'pages/Creator/StripeRedirect/StripeRedirect';
import Layout from './Layout';
import * as Slides from '../BuilderSlides';
import Submitted from './Submitted';

import { makeStyles } from '@material-ui/core/styles';
import styles from './CreateExperience.styles';
const useStyles = makeStyles(styles);

const CreateExperience = () => {
    const { CreateExperience: text } = useLanguageContext().appText;
    const languageList = useLanguages();
    const classes = useStyles();

    const history = useHistory();
    const location = useLocation();
    const { path } = useRouteMatch();
    const dispatch = useAppDispatch();

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

    const handleError = () => {
        dispatch(openErrorDialog({
            message: 'Something went wrong...'
        }));
        setTimeout(() => {
            history.replace('/');
        }, 4000);
    }

    const { 
        data: creatorData,
        loading: loadingCreatorData
    } = useGetCreationProfileQuery({
        onError: handleError
    });

    // Use existing locations for location autocomplete
    const {
        data: locationsData,
        loading: loadingLocationsData
    } = useGetLocationsQuery({
        onError: handleError
    });

    const [
        createExperience,
        { data: creationData }
    ] = useCreateExperienceMutation({
        onError: handleError
    });

    // Form management
    const [state, formDispatch] = useCreationReducer();

    const handleStringValueChange = useCallback((field: StringField, value: string) => {
        formDispatch({ type: 'SET_STRING_FIELD', field, value });
    }, [formDispatch]);

    const handleBooleanValueChange = useCallback((field: BooleanField, value: boolean) => {
        formDispatch({ type: 'SET_BOOLEAN_FIELD', field, value });
    }, [formDispatch]);

    const handleNumberValueChange = useCallback((field: NumberField, value: number) => {
        formDispatch({ type: 'SET_NUMBER_FIELD', field, value });
    }, [formDispatch]);

    const handleArrayValueChange = useCallback((field: ArrayField, value: string[] | EventInput[]) => {
        formDispatch({ type: 'SET_ARRAY_FIELD', field, value });
    }, [formDispatch]);

    const handleFieldValidity = useCallback((value: boolean) => {
        formDispatch({ type: 'SET_CAN_CONTINUE', value });
    }, [formDispatch]);

    // Every time the step changes, go to that slide
    useEffect(() => {
        history.push(`/experience/new/${state.currentStep}`);
    }, [state.currentStep, history]);

    // Reset the form when leaving the page
    useEffect(() => {   
        return () => { formDispatch({ type: 'END_SUBMIT' }); }
    }, [formDispatch]);

    const handleSubmit = async () => {
        formDispatch({ type: 'START_SUBMIT' });
        
        // Upload images to Cloudinary
        const images: string[] = [];
        for (const imgFile of state.form.images) {
            const formData = new FormData();
            formData.append('file', (imgFile as File));
            formData.append('upload_preset', 'RAMBLE-experiences');

            const { secure_url } = await fetch(process.env.REACT_APP_CLOUDINARY_API_URI!, {
                method: 'POST',
                body: formData
            }).then(res => res.json());

            images.push(secure_url);
        }
        
        // Add experience to database
        createExperience({
            variables: {
                title: state.form.title,
                description: state.form.planning,
                images,
                location: state.form.location,
                meetingPoint: state.form.isOnlineExperience ? 
                    undefined : state.form.meetingPoint,
                latitude: state.form.isOnlineExperience ? 
                    undefined : state.form.latitude,
                longitude: state.form.isOnlineExperience ?
                    undefined : state.form.longitude,
                categories: state.form.categories,
                ageRestriction: state.form.isAgeRestricted ? 
                    state.form.ageRequired : undefined,
                duration: state.form.duration,
                languages: state.form.languages,
                includedItems: state.form.included,
                toBringItems: state.form.toBring,
                capacity: state.form.capacity,
                zoomPMI: state.form.isOnlineExperience ? 
                    state.form.zoomMeetingId : undefined,
                zoomPassword: state.form.isOnlineExperience ?
                    state.form.zoomMeetingPassword : undefined,
                pricePerPerson: state.form.pricePerPerson,
                privatePrice: state.form.privatePrice > 0 ?
                    state.form.privatePrice : undefined,
                currency: state.form.currency,
                slots: state.form.slots!.map(({ startStr, endStr }) => ({
                    start: startStr,
                    end: endStr
                }))
            }
        });
    }
    
    if (loadingCreatorData || !creatorData || loadingLocationsData || !locationsData) {
        return <Spinner />;
    }

    const creatorId = creatorData?.me.creator?._id;
    const onboardedWithStripe = creatorData?.me.creator?.stripeProfile.onboarded;

    // If creator hasn't completed the Stripe onboarding, let them try again
    if (!onboardedWithStripe && creatorId) {
        return <StripeRedirect creatorId={creatorId} />;
    }

    // When done, show Submitted slide
    if (creationData?.createExperience) {
        return <Submitted experienceTitle={creationData.createExperience.title} />;
    }

    if (animationDone) {
        return (
            <Layout 
            stepsCompleted={state.stepsCompleted} 
            currentStepIdx={state.currentStepIdx}
            currentStep={state.currentStep}
            canContinue={state.canContinue}
            onNavigate={stepIdx => formDispatch({ type: 'GO_TO_STEP', stepIdx })}
            onBack={() => formDispatch({ type: 'GO_TO_PREV_STEP' })}
            onNext={
                state.currentStep === 'review' ?
                    handleSubmit : () => formDispatch({ type: 'GO_TO_NEXT_STEP' })
            }>
                {state.loading && <Spinner />}
                <Prompt message={text.leavePageAlert} />
                <Switch location={location}>
                    <Route path={`${path}/setting`}>
                        <Slides.Setting
                        isOnlineExperience={state.form.isOnlineExperience}
                        onSelectType={val => handleBooleanValueChange('isOnlineExperience', val)}
                        onSlideComplete={handleFieldValidity} />
                    </Route>
                    <Route path={`${path}/location`}>
                        <Slides.Location
                        storedLocations={[ ...new Set(locationsData.experiences.map(({ location }) => 
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
                            formDispatch({
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
                            formDispatch({ type: 'SET_IMAGE_FILE', index, value });
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
                            photo: creatorData.me.photo!,
                            bio: creatorData.me.creator!.bio
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