import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch, useLocation, Switch, Route } from 'react-router-dom';

import Spinner from '../../components/Spinner/Spinner';
import PrivateRoute from '../PrivateRoute';
import Page404 from '../Page404/Page404';
const CreatorsIntro = React.lazy(() => import('./CreatorsIntro/CreatorsIntro'));
const CreatorForm = React.lazy(() => import('./CreatorForm/CreatorForm'));
const ExpSchedule = React.lazy(() => import('./ExpSchedule/ExpSchedule'));
const DashboardRouter = React.lazy(() => import('./CreatorDashboard/Router'));

const Router = () => {
    const { path } = useRouteMatch();
    const location = useLocation();
    const isCreator = useSelector(state => state.user.creator.id);
    const lang = useSelector(state => state.ui.language);

    return (
        <React.Suspense fallback={<Spinner/>}>
            <Switch location={location}>
                <PrivateRoute path={`${path}/dashboard`} test={isCreator}>
                    <DashboardRouter/>
                </PrivateRoute>
                <PrivateRoute path={`${path}/join`} test={!isCreator}>
                    <CreatorForm/>
                </PrivateRoute>
                <Route path={`${path}/schedule/:expId`} component={ExpSchedule}/>
                <Route path={`${path}/become`}>
                    <CreatorsIntro lang={lang}/>
                </Route>
                <Route component={Page404}/>
            </Switch>
        </React.Suspense>
    );
}

export default Router;