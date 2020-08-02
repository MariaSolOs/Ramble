import React from 'react';
import {connect} from 'react-redux';
import {useRouteMatch, useLocation, Switch, Route} from 'react-router-dom';

//Pages and layout
import Nav from '../components/Navs/AdminNav';
import ApproveExps from '../pages/Admin/ApproveExps';
import ApprovalPage from '../pages/Admin/ApprovalPage/ApprovalPage';
import Register from '../pages/Admin/Register';

const AdminApp = (props) => {
    const {path} = useRouteMatch();
    const location = useLocation();

    return (
        <>
            <Nav 
            canRegister={props.canRegister} 
            canEditExps={props.canEditExps}/>
            <Switch location={location}>
                <Route path={`${path}/approveExps`} component={ApproveExps}/>
                <Route path={`${path}/approveExp/:id`} component={ApprovalPage}/>
                <Route path={`${path}/register`} component={Register}/>
            </Switch>
        </>
    );
}

const mapStateToProps = (state) => ({
    canRegister: state.user.userData.permissions.includes('addAdmin'),
    canEditExps: state.user.userData.permissions.includes('approveExp')
});

export default connect(mapStateToProps, null)(AdminApp);