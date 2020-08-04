import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchUserProfile} from '../store/actions/user';
import {fetchCreatorProfile} from '../store/actions/creator';
import {messageShown} from '../store/actions/ui';
import {Route, Switch, useHistory} from 'react-router-dom';

import Snackbar from '../components/Snackbar';
import ErrorDialog from '../components/Dialogs/ErrorDialog/ErrorDialog';
import Spinner from '../components/Spinner';
import PublicApp from './PublicApp';
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
    const {fetchUserProfile, fetchCreatorProfile} = props;
    useEffect(() => { 
        fetchUserProfile();
        fetchCreatorProfile();
    }, [fetchUserProfile, fetchCreatorProfile]);

    return (
        <React.Suspense fallback={<Spinner/>}> 
            {props.loading && <Spinner/>}
            <Snackbar 
            open={props.msgComponent === 'Snackbar'} 
            message={props.msg} 
            onClose={props.onMsgShown}/>
            <ErrorDialog
            open={props.msgComponent === 'ErrorDialog'} 
            message={props.msg} 
            onClose={props.onMsgShown}/>
            <Switch>
                {props.isAdmin &&
                    <Route path="/admin">
                        <AdminApp/>
                    </Route>}
                <Route path="/">
                    <PublicApp/>
                </Route>
            </Switch>
        </React.Suspense>
    );
}

const mapStateToProps = (state) => ({
    isAuth: state.user.token !== null,
    isAdmin: state.user.isAdmin,
    loading: state.ui.loading,
    msg: state.ui.message,
    msgComponent: state.ui.messageComponent
});
const mapDispatchToProps = (dispatch) => ({
    fetchUserProfile: () => dispatch(fetchUserProfile()),
    fetchCreatorProfile: () => dispatch(fetchCreatorProfile()),
    onMsgShown: () => dispatch(messageShown())
}); 

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
