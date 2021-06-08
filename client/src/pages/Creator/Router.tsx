import React from 'react';
import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';

import BecomeACreator from './BecomeACreator/BecomeACreator';
import Spinner from 'components/Spinner/Spinner';

const Router = () => {
    const { path } = useRouteMatch();
    const location = useLocation();

    return (
        <React.Suspense fallback={<Spinner />}>
            <Switch location={location}>
                <Route path={`${path}/become`} component={BecomeACreator} />
            </Switch>
        </React.Suspense>
    );
}

export default Router;