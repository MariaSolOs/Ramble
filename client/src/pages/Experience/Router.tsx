import React from 'react';
import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';

import SearchExperiences from './SearchExperiences/SearchExperiences';
import ViewExperience from './ViewExperience/ViewExperience';
import Spinner from '../../components/Spinner/Spinner';

const Router = () => {
    const { path } = useRouteMatch();
    const location = useLocation();

    return (
        <React.Suspense fallback={<Spinner />}>
            <Switch location={location}>
                <Route path={`${path}/search`} component={SearchExperiences} />
                <Route path={`${path}/view/:experienceId`} component={ViewExperience} />
            </Switch>
        </React.Suspense>
    );
}

export default Router;