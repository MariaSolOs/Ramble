import { useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import useBookingReducer from './useBookingReducer';
import { useGetBookingExperienceQuery, useGetOccurrencesQuery } from 'graphql-api';
import { useAppSelector, useAppDispatch } from 'hooks/redux'; 
import { openSignUpDialog } from 'store/uiSlice';

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
        onError: (error) => console.error(error)
    });

    const handleContinue = useCallback((value: boolean) => {
        dispatch({ type: 'SET_CAN_CONTINUE', value });
    }, [dispatch]);

    // Get occurrences
    const {
        loading: occsLoading
    } = useGetOccurrencesQuery({
        variables: { experienceId },
        onCompleted: (occurrences) => {
            dispatch({ type: 'SET_OCCURRENCES', occurrences });
        }
    });

    const handleSubmit = () => {

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
                    userEmail={userEmail}
                    selectedDate={state.form.date!}
                    selectedSlot={state.form.timeslot!}
                    price={
                        state.form.bookingType === 'public' ? 
                        state.experience!.pricePerPerson : 
                        state.experience!.privatePrice!
                    }
                    numGuests={
                        state.form.bookingType === 'public' ? 
                        state.form.numGuests : undefined
                    }
                    onSlideComplete={handleContinue} />
                );
        }
    }

    // If the user isn't logged in, prompt sign up before payment
    useEffect(() => {
        if (state.step === 'payment' && !isLoggedIn) {
            appDispatch(openSignUpDialog());
        }
    }, [state.step, isLoggedIn, appDispatch]);

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
        onGoBack={() => {
            isFirstStep ? history.goBack() : dispatch({ type: 'GO_BACK' });
        }}
        onGoNext={() => {
            isLastStep ? handleSubmit() : dispatch({ type: 'GO_TO_NEXT_STEP' });
        }}>
            {getSlideContent()}
        </Layout>
    );
}

export default BookExperience;