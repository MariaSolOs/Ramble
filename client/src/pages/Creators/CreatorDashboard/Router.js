import React, {useEffect, useCallback} from 'react';
import {connect} from 'react-redux';
import {startLoading, endLoading, showError} from '../../../store/actions/ui';
import {setNumBookings} from '../../../store/actions/user';
import {useRouteMatch, useLocation, Switch, Route, useHistory} from 'react-router-dom';
import axios from '../../../tokenizedAxios';
import useDashboardReducer from './store/reducer';
import {actions} from './store/types';

//Pages and layout
import BookingRequests from './BookingRequests/BookingRequests';
import Calendar from './Calendar/Calendar';
import NoCreatedExps from './Calendar/NoCreatedExps';
import ExpSchedule from './ExpSchedule/ExpSchedule';
import Page404 from '../../Page404/Page404'; 

const Router = (props) => {
    const {path} = useRouteMatch();
    const location = useLocation();
    const history = useHistory();

    const {startLoading, endLoading, showError, 
           numBookings, creatorId, decNumBookings} = props;

    const [state, dispatch] = useDashboardReducer();
    //Fetch booking requests
    useEffect(() => {
        startLoading();
        axios.get('/api/creator/bookingRequests')
        .then(res => {
            dispatch({
                type: actions.SET_BOOKING_REQUESTS,
                requests: res.data.bookingRequests
            });
        })
        .catch(err => {
            showError('We f*cked up. We cannot get your bookings right now...');
        });
        endLoading();
    }, [startLoading, endLoading, showError, numBookings, dispatch]);

    //Fetch creator's experiences
    useEffect(() => {
        startLoading();
        axios.get(`/api/creator/${creatorId}/experiences`)
        .then(res => {
            dispatch({
                type: actions.SET_CREATED_EXPS,
                exps: res.data.exps
            });
            //The default experience will be the first one
            if(res.data.exps.length > 0) {
                dispatch({
                    type: actions.SET_EDITING_EXP,
                    exp: res.data.exps[0],
                    date: new Date()
                });
            }
            endLoading();
        }).catch(err => {
            endLoading();
            showError("Your calendar isn't available right now.");
            setTimeout(() => { history.push('/'); }, 3000);
        });
    }, [creatorId, startLoading, endLoading, showError, history, dispatch]);

    //Booking requests actions
    const handleDeleteRequest = useCallback((id) => {
        dispatch({type: actions.DELETE_BOOKING_REQUEST, id});
        decNumBookings();
    }, [dispatch, decNumBookings]);

    //Calendar actions
    const handleEditExp = useCallback((exp) => {
        dispatch({type: actions.CHANGE_EDIT_EXP, exp});
    }, [dispatch]);
    const handleEditDate = useCallback((date) => {
        dispatch({type: actions.CHANGE_EDIT_DATE, date});
    }, [dispatch]);

    return (
        <Switch location={location}>
            {state.bookingRequests &&
                <Route path={`${path}/bookings`}>
                    <BookingRequests 
                    bookingRequests={state.bookingRequests}
                    deleteRequest={handleDeleteRequest}/>
                </Route>}
            {state.createdExps &&
                <Route path={`${path}/calendar`}>
                {state.createdExps.length > 0?
                    <Calendar 
                    createdExps={state.createdExps}
                    bookingRequests={state.bookingRequests}
                    exp={state.editExp}
                    date={state.editDate}
                    onExpChange={handleEditExp}
                    onDateChange={handleEditDate}/> :
                    <NoCreatedExps/>}
                </Route>}
            <Route path={`${path}/:id/schedule`} component={ExpSchedule}/>
            <Route component={Page404}/>
        </Switch>
    );
}

const mapStateToProps = (state) => ({
    creatorId: state.user.creator.id,
    numBookings: state.user.creator.numBookings
});
const mapDispatchToProps = (dispatch) => ({
    startLoading: () => dispatch(startLoading()),
    endLoading: () => dispatch(endLoading()),
    showError: (msg) => dispatch(showError(msg)),
    decNumBookings: () => dispatch(setNumBookings('dec'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Router);