import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchUserProfile} from '../store/actions/user';
import {messageShown} from '../store/actions/ui';
import {Route, Switch, useHistory} from 'react-router-dom';

import Snackbar from '../components/Snackbar/Snackbar';
import ErrorDialog from '../components/Dialogs/ErrorDialog/ErrorDialog';
import Spinner from '../components/Spinner/Spinner';
import IdleTimer from '../components/IdleTimer/IdleTimer';
import PublicApp from './PublicApp';
import PrivateRoute from '../pages/PrivateRoute';
const AdminApp = React.lazy(() => import('./AdminApp'));

const MainApp = (props) => {
    const history = useHistory();

    //For redirect requests:
    const redirect = window.localStorage.getItem('redirectURL');
    useEffect(() => {
        if(redirect) { 
            history.push(redirect); 
            window.localStorage.removeItem('redirectURL');
        }
    }, [redirect, history]);

    //For automatic auth after refreshing the page
    const {fetchUserProfile} = props;
    useEffect(() => { 
        fetchUserProfile();
    }, [fetchUserProfile]);

    return (
        <React.Suspense fallback={<Spinner/>}> 
            {props.isAuth && <IdleTimer/>}
            {(props.loading && !props.isAuth) ? <Spinner/> : 
                <>
                {(props.loading && props.isAuth) && <Spinner/>}
                <Snackbar 
                open={props.msgComponent === 'Snackbar'} 
                message={props.msg} 
                onClose={props.onMsgShown}/>
                <ErrorDialog
                open={props.msgComponent === 'ErrorDialog'} 
                message={props.msg} 
                onClose={props.onMsgShown}/>
                <Switch>
                    <PrivateRoute path="/admin" test={props.isAdmin}>
                        <AdminApp/>
                    </PrivateRoute>
                    <Route>
                        <PublicApp/>
                    </Route>
                </Switch>
                </>}
        </React.Suspense>
    );
}

const mapStateToProps = (state) => ({
    isAuth: state.user.profile.id !== null,
    isAdmin: state.user.isAdmin,
    loading: state.ui.loading,
    msg: state.ui.message,
    msgComponent: state.ui.messageComponent
});
const mapDispatchToProps = (dispatch) => ({
    fetchUserProfile: () => dispatch(fetchUserProfile()),
    onMsgShown: () => dispatch(messageShown())
}); 

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
