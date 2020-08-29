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
                exps: res.data.expInfo
            });
            endLoading();
        }).catch(err => {
            endLoading();
            showError("Your calendar isn't available right now.");
            setTimeout(() => { history.push('/'); }, 3000);
        });
    }, [creatorId, startLoading, endLoading, showError, history, dispatch]);

    const deleteRequest = useCallback((id) => {
        dispatch({type: actions.DELETE_BOOKING_REQUEST, id});
        decNumBookings();
    }, [dispatch, decNumBookings]);

    return (
        <Switch location={location}>
            {state.bookingRequests &&
                <Route path={`${path}/bookings`}>
                    <BookingRequests 
                    bookingRequests={state.bookingRequests}
                    deleteRequest={deleteRequest}/>
                </Route>}
            {state.createdExps &&
                <Route path={`${path}/calendar`}>
                    <Calendar 
                    bookingRequests={state.bookingRequests}
                    experiences={state.createdExps}/>
                </Route>}
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