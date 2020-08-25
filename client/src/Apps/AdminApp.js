import React from 'react';
import {connect} from 'react-redux';
import {useRouteMatch, useLocation, Switch, Route} from 'react-router-dom';

//Pages and layout
import Nav from '../components/Navs/AdminNav';
import ApproveExps from '../pages/Admin/ApproveExps';
import ApprovalPage from '../pages/Admin/ApprovalPage/ApprovalPage';
import Register from '../pages/Admin/Register';
import Maintenance from '../pages/Admin/Maintenance';
import PrivateRoute from '../pages/PrivateRoute';

const AdminApp = (props) => {
    const {path} = useRouteMatch();
    const location = useLocation();

    return (
        <>
        <Nav 
        canRegister={props.canRegister} 
        canApproveExps={props.canApproveExps}
        canMaintain={props.canMaintain}/>
        <Switch location={location}>
            <PrivateRoute path={`${path}/approveExps`} test={props.canApproveExps}>
                <ApproveExps/>
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
            <Route component={ApproveExps}/>
        </Switch>
        </>
    );
}

const mapStateToProps = (state) => ({
    canRegister: state.user.profile.permissions.includes('addAdmin'),
    canApproveExps: state.user.profile.permissions.includes('approveExp'),
    canMaintain: state.user.profile.permissions.includes('maintenance')
});

export default connect(mapStateToProps, null)(AdminApp);