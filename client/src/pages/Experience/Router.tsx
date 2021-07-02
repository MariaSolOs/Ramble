import React from 'react';
import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';

import Spinner from 'components/Spinner/Spinner';
const SearchExperiences = React.lazy(() => import('./SearchExperiences/SearchExperiences'));
const ViewExperience = React.lazy(() => import('./ViewExperience/ViewExperience'));
const CreateExperience = React.lazy(() => import('./CreateExperience/CreateExperience'));
const BookExperience = React.lazy(() => import('./BookExperience/BookExperience'));

const Router = () => {
    const { path } = useRouteMatch();
    const location = useLocation();

    return (
        <React.Suspense fallback={<Spinner />}>
            <Switch location={location}>
                <Route path={`${path}/search`} component={SearchExperiences} />
                <Route path={`${path}/view/:experienceId`} component={ViewExperience} />
                <Route path={`${path}/new`} component={CreateExperience} />
                <Route path={`${path}/booking/:experienceId`} component={BookExperience} />
            </Switch>
        </React.Suspense>
    );
}

export default Router;