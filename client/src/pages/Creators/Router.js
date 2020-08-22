import React from 'react';
import {useSelector} from 'react-redux';
import {useRouteMatch, useLocation, Switch, Route, Redirect} from 'react-router-dom';

//Pages
import Spinner from '../../components/Spinner';
import PrivateRoute from '../PrivateRoute';
const CreatorsIntro = React.lazy(() => import('./CreatorsIntro/CreatorsIntro'));
const CreatorForm = React.lazy(() => import('./CreatorForm/CreatorForm'))
const DashboardRouter = React.lazy(() => import('./CreatorDashboard/Router'));

const Router = (props) => {
    const {path} = useRouteMatch();
    const location = useLocation();

    const isCreator = useSelector(state => state.user.creator.id);

    return (
        <React.Suspense fallback={<Spinner/>}>
            <Switch location={location}>
                <PrivateRoute path={`${path}/dashboard`} test={isCreator}>
                    <DashboardRouter/>
                </PrivateRoute>
                <PrivateRoute path={`${path}/join`} test={!isCreator}>
                    <CreatorForm/>
                </PrivateRoute>
                <Route path={`${path}/become`} component={CreatorsIntro}/>
                <Redirect to="/"/>
            </Switch>
        </React.Suspense>
    );
}

export default Router;