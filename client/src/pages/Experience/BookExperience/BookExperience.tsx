import { useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import useBookingReducer from './useBookingReducer';
import { useGetBookingExperienceQuery, useGetOccurrencesQuery } from 'graphql-api';
import { useAppSelector, useAppDispatch } from 'hooks/redux'; 
import { openSignUpDialog, openErrorDialog } from 'store/uiSlice';
import { getFeesBreakdown } from 'utils/booking';

import Spinner from 'components/Spinner/Spinner';
import Layout from './Layout';
import DateSlide from './DateSlide';
import TimeslotSlide from './TimeslotSlide';
import BookingTypeSlide from './BookingTypeSlide';
import PaymentSlide from './PaymentSlide';

const BookExperience = () => {
    const appDispatch = useAppDispatch();
    const history = useHistory();
    
    // Fetch the information of the current logged in user
    const isLoggedIn = useAppSelector(state => state.user.isLoggedIn);
    const userEmail = useAppSelector(state => state.user.email);

    const [state, dispatch] = useBookingReducer();

    // Retrieve experience ID from URL
    const { experienceId } = useParams<{ experienceId: string; }>();

    // Get the experience for the preview
    const { 
        loading: experienceLoading
    } = useGetBookingExperienceQuery({
        variables: { id: experienceId },
        onCompleted: ({ experience }) => {
            dispatch({ type: 'SET_EXPERIENCE', experienceData: experience });
        },
        onError: () => handleError("We can't complete your booking right now...")
    });

    // Get occurrences
    const {
        loading: occsLoading
    } = useGetOccurrencesQuery({
        variables: { experienceId },
        onCompleted: (occurrences) => {
            dispatch({ type: 'SET_OCCURRENCES', occurrences });
        },
        onError: () => handleError("We can't complete your booking right now...")
    });

    // Pre-fill the email field with the stored one
    useEffect(() => {
        dispatch({ type: 'SET_EMAIL', email: userEmail });
    }, [userEmail, dispatch]);

    // If the user isn't logged in, prompt sign up before payment
    useEffect(() => {
        if (state.step === 'payment' && !isLoggedIn) {
            appDispatch(openSignUpDialog());
            dispatch({ type: 'GO_BACK' });
        }
    }, [state.step, isLoggedIn, appDispatch, dispatch]);

    // Keep the fees updated
    useEffect(() => {
        if (state.experience) {
            const price = state.form.bookingType === 'public' ?
                state.experience.pricePerPerson : state.experience.privatePrice!;
            const fees = getFeesBreakdown(
                price,
                state.experience.isZoomExperience,
                state.form.bookingType!,
                state.form.numGuests
            );
            dispatch({ type: 'SET_FEES', fees });
        }

    }, [state.experience, state.form.bookingType, state.form.numGuests, dispatch]);

    const handleError = useCallback((message: string) => {
        appDispatch(openErrorDialog({ message }));
        history.replace('/');
    }, [appDispatch, history]);

    const handleContinue = useCallback((value: boolean) => {
        dispatch({ type: 'SET_CAN_CONTINUE', value });
    }, [dispatch]);

    const handleSubmit = async () => {
        dispatch({ type: 'SET_LOADING', loading: true });

        dispatch({ type: 'SET_LOADING', loading: false });
    }

    const getSlideContent = () => {
        switch (state.step) {
            case 'date': 
                return (
                    <DateSlide
                    allowedDates={new Set(state.occurrences.keys())}
                    selectedDate={state.form.date}
                    onDateSelected={date => {
                        dispatch({ type: 'SET_DATE', date });
                    }}
                    onSlideComplete={handleContinue} />
                );
            case 'time':
                return (
                    <TimeslotSlide
                    selectedDate={state.form.date!}
                    timeslot={state.form.timeslot}
                    allSlots={state.occurrences.get(state.form.date!)!}
                    experienceCapacity={state.experience!.capacity}
                    onTimeslotChange={timeslot => {
                        dispatch({ type: 'SET_TIMESLOT', timeslot });
                    }}
                    onSlideComplete={handleContinue} />
                );
            case 'bookingType':
                return (
                    <BookingTypeSlide
                    bookingType={state.form.bookingType}
                    numGuests={state.form.numGuests}
                    pricePerPerson={state.experience!.pricePerPerson}
                    privatePrice={state.experience!.privatePrice}
                    experienceCapacity={state.experience!.capacity}
                    selectedSlot={state.form.timeslot!}
                    isOnlineExperience={state.experience?.isZoomExperience!}
                    onBookingTypeChange={bookingType => {
                        dispatch({ type: 'SET_BOOKING_TYPE', bookingType });
                    }}
                    onNumGuestsChange={numGuests => {
                        dispatch({ type: 'SET_NUM_GUESTS', numGuests });
                    }}
                    onSlideComplete={handleContinue} />
                );
            case 'payment':
                return (
                    <PaymentSlide
                    email={state.form.email}
                    zipCode={state.form.zipCode}
                    selectedDate={state.form.date!}
                    selectedSlot={state.form.timeslot!}
                    currency={state.experience?.currency!}
                    fees={state.form.fees!}
                    onEmailChange={email => {
                        dispatch({ type: 'SET_EMAIL', email });
                    }}
                    onZipCodeChange={zipCode => {
                        dispatch({ type: 'SET_ZIP_CODE', zipCode });
                    }}
                    onSlideComplete={handleContinue} />
                );
        }
    }

    if (experienceLoading || occsLoading || !state.experience || !state.creator) {
        return <Spinner />;
    }

    const isFirstStep = state.step === 'date';
    const isLastStep = state.step === 'payment';

    return (
        <Layout
        experience={state.experience!}
        creator={state.creator!}
        currentStep={state.step}
        nextButtonWidth={isFirstStep ? 330 : isLastStep ? 370 : '100%'}
        canContinue={state.canContinue}
        bookingPrice={isLastStep ? 
            state.form.fees.withServiceFee + state.form.fees.taxGST + state.form.fees.taxQST
        : undefined}
        onGoBack={() => {
            isFirstStep ? history.goBack() : dispatch({ type: 'GO_BACK' });
        }}
        onGoNext={() => {
            isLastStep ? handleSubmit() : dispatch({ type: 'GO_TO_NEXT_STEP' });
        }}>
            {state.loading && <Spinner />}
            {getSlideContent()}
        </Layout>
    );
}

export default BookExperience;