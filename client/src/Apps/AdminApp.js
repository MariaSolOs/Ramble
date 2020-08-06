import React from 'react';
import {connect} from 'react-redux';
import {useRouteMatch, useLocation, Switch, Route} from 'react-router-dom';

//Pages and layout
import Nav from '../components/Navs/AdminNav';
import ApproveExps from '../pages/Admin/ApproveExps';
import ApprovalPage from '../pages/Admin/ApprovalPage/ApprovalPage';
import Register from '../pages/Admin/Register';
import Maintenance from '../pages/Admin/Maintenance/Maintenance';

//TODO: Add Homepage
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
                {props.canApproveExps && 
                    <Route path={`${path}/approveExps`} component={ApproveExps}/>}
                {props.canApproveExps && 
                    <Route path={`${path}/approveExp/:id`} component={ApprovalPage}/>}
                {props.canRegister &&
                    <Route path={`${path}/register`} component={Register}/>}
                {props.canMaintain &&
                    <Route path={`${path}/maintenance`} component={Maintenance}/>}
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