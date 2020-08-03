import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchCreatorProfile} from '../../../store/actions/user';
import {useRouteMatch, useLocation, Switch, Route} from 'react-router-dom';

//Pages and layout
import BookingRequests from './BookingRequests/BookingRequests';
import Layout from './Layout/Layout';

const Router = (props) => {
    const {path} = useRouteMatch();
    const location = useLocation();

    //Fetch creator information when here 
    const {creatorProfile, fetchCreatorProfile} = props;
    useEffect(() => {
        if(!creatorProfile.creatorId) {
            fetchCreatorProfile();
        }
    }, [creatorProfile, fetchCreatorProfile]);

    return (
        <Layout>
            {creatorProfile.creatorId && 
            <Switch location={location}>
                <Route path={`${path}/bookings`} component={BookingRequests}/>
            </Switch>}
        </Layout>
    );
}

const mapStateToProps = (state) => ({
    creatorProfile: state.user.creatorData
});
const mapDispatchToProps = (dispatch) => ({
    fetchCreatorProfile: () => dispatch(fetchCreatorProfile())
});

export default connect(mapStateToProps, mapDispatchToProps)(Router);