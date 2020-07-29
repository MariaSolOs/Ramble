import React from 'react';
import {connect} from 'react-redux';
import {useRouteMatch, useLocation, Switch, Route} from 'react-router-dom';
import withSnackbar from '../hoc/withSnackbar';

//Pages and layout
import Snackbar from '../components/Snackbar';
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
            isAuth={props.isAuth}
            canRegister={props.canRegister} 
            canEditExps={props.canEditExps}/>
            <Switch location={location}>
                <Route path={`${path}/approveExps`}>
                    <ApproveExps displaySnackbar={props.displaySnackbar}/>
                </Route>
                <Route path={`${path}/approveExp/:id`}>
                    <ApprovalPage displaySnackbar={props.displaySnackbar}/>
                </Route>
                <Route path={`${path}/register`}>
                    <Register displaySnackbar={props.displaySnackbar}/>
                </Route>
                {/* <Route exact path={`${path}/`}>
                    <Auth/>
                </Route> */}
            </Switch>
        </>
    );
}

const mapStateToProps = (state, ownProps) => ({
    canRegister: ownProps.isAuth && state.user.userData.permissions.includes('addAdmin'),
    canEditExps: ownProps.isAuth && state.user.userData.permissions.includes('approveExp')
});

export default connect(mapStateToProps, null)(withSnackbar(AdminApp, Snackbar));