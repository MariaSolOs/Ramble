import React from 'react';
import {useRouteMatch, useLocation, Switch, Route} from 'react-router-dom';

//Pages
import Spinner from '../../components/Spinner/Spinner';
import SearchExperiences from './SearchExperiences/SearchExperiences';
import ShowExperience from './ShowExperience/ShowExperience';
import PrivateRoute from '../PrivateRoute';
import Page404 from '../Page404/Page404';
const CreateExperience = React.lazy(() => import('./CreateExperience/CreateExperience'));
const ReviewExperience = React.lazy(() => import('./ReviewExperience/ReviewExperience'));
const BookingSubmitted = React.lazy(() => import('./BookExperience/BookingSubmitted/BookingSubmitted'));

const Router = (props) => {
    const {path} = useRouteMatch();
    const location = useLocation();

    return (
        <React.Suspense fallback={<Spinner/>}>
            <Switch location={location}>
                <Route path={`${path}/search`} component={SearchExperiences}/>
                <PrivateRoute path={`${path}/new`} test={props.isAuth}>
                    <CreateExperience/>
                </PrivateRoute>
                <Route path={`${path}/view/:id`} component={ShowExperience}/>
                <PrivateRoute path={`${path}/review/:id`} test={props.isAuth}>
                    <ReviewExperience/>
                </PrivateRoute>
                <PrivateRoute path={`${path}/booking-submitted`} test={props.isAuth}>
                    <BookingSubmitted/>
                </PrivateRoute>
                <Route component={Page404}/>
            </Switch>
        </React.Suspense>
    );
}

export default Router;