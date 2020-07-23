import React, {Suspense, lazy} from 'react';
import {useRouteMatch, useLocation, Switch, Route, Redirect} from 'react-router-dom';

//Pages
import Spinner from '../../components/Spinner';
import SearchExperiences from './SearchExperiences/SearchExperiences';
import ShowExperience from './ShowExperience/ShowExperience';
const CreateExperience = lazy(() => import('./CreateExperience/CreateExperience'));

const Router = ({isAuth}) => {
    const {path} = useRouteMatch();
    const location = useLocation();

    return (
        <Suspense fallback={<Spinner/>}>
            <Switch location={location}>
                {isAuth && <Route path={`${path}/new`} component={CreateExperience}/>}
                <Route path={`${path}/search`} component={SearchExperiences}/>
                <Route path={`${path}/:id`} component={ShowExperience}/>
                <Redirect to="/"/>
            </Switch>
        </Suspense>
    );
}

export default Router;