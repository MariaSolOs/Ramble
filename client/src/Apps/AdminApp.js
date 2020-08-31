import React from 'react';
import {connect} from 'react-redux';
import {useRouteMatch, useLocation, Switch, Route} from 'react-router-dom';

//Pages and layout
import Nav from '../components/Navs/AdminNav/AdminNav';
import ApproveExps from '../pages/Admin/ApproveExps/ApproveExps';
import ExpReviews from '../pages/Admin/ExpReviews/ExpReviews';
import ApprovalPage from '../pages/Admin/ApprovalPage/ApprovalPage';
import Register from '../pages/Admin/Register/Register';
import Maintenance from '../pages/Admin/Maintenance/Maintenance';
import PrivateRoute from '../pages/PrivateRoute';
import Page404 from '../pages/Page404/Page404';

const AdminApp = (props) => {
    const {path} = useRouteMatch();
    const location = useLocation();

    return (
        <>
        <Nav permissions={props.permissions}/>
        <Switch location={location}>
            <PrivateRoute path={`${path}/approveExps`} test={props.canApproveExps}>
                <ApproveExps/>
            </PrivateRoute>
            <PrivateRoute path={`${path}/exp-reviews`} test={props.canSeeReviews}>
                <ExpReviews/>
            </PrivateRoute>
            <PrivateRoute path={`${path}/approveExp/:id`} test={props.canApproveExps}>
                <ApprovalPage/>
            </PrivateRoute>
            <PrivateRoute path={`${path}/register`} test={props.canRegister}>
                <Register/>
            </PrivateRoute>
            <PrivateRoute path={`${path}/maintenance`} test={props.canMaintain}>
                <Maintenance/>
            </PrivateRoute>
            <Route component={Page404}/>
        </Switch>
        </>
    );
}

const mapStateToProps = (state) => ({
    permissions: state.user.profile.permissions,
    canRegister: state.user.profile.permissions.includes('addAdmin'),
    canApproveExps: state.user.profile.permissions.includes('approveExp'),
    canSeeReviews: state.user.profile.permissions.includes('seeReviews'),
    canMaintain: state.user.profile.permissions.includes('maintenance')
});

export default connect(mapStateToProps, null)(AdminApp);