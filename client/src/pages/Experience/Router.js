import React from 'react';
import {useRouteMatch, useLocation, Switch, Route, Redirect} from 'react-router-dom';

//Pages
import Spinner from '../../components/Spinner';
import SearchExperiences from './SearchExperiences/SearchExperiences';
import ShowExperience from './ShowExperience/ShowExperience';
import PrivateRoute from '../PrivateRoute';
const CreateExperience = React.lazy(() => import('./CreateExperience/CreateExperience'));

const Router = (props) => {
    const {path} = useRouteMatch();
    const location = useLocation();

    return (
        <React.Suspense fallback={<Spinner/>}>
            <Switch location={location}>
                <PrivateRoute path={`${path}/new`} test={props.isAuth}>
                    <CreateExperience/>
                </PrivateRoute>
                <Route path={`${path}/search`} component={SearchExperiences}/>
                <Route path={`${path}/:id`} component={ShowExperience}/>
                <Redirect to="/"/>
            </Switch>
        </React.Suspense>
    );
}

export default Router;