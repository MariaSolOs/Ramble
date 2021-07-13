import React from 'react';
import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';

import Spinner from 'components/Spinner/Spinner';
const BecomeACreator = React.lazy(() => import('./BecomeACreator/BecomeACreator'));
const CreatorForm = React.lazy(() => import('./CreatorForm/CreatorForm'));
const Dashboard = React.lazy(() => import('./Dashboard/Router'));

const Router = () => {
    const { path } = useRouteMatch();
    const location = useLocation();

    return (
        <React.Suspense fallback={<Spinner />}>
            <Switch location={location}>
                <Route path={`${path}/become`} component={BecomeACreator} />
                <Route path={`${path}/join`} component={CreatorForm} />
                <Route path={`${path}/dashboard`} component={Dashboard} />
            </Switch>
        </React.Suspense>
    );
}

export default Router;