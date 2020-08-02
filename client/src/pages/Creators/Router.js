import React from 'react';
import {useSelector} from 'react-redux';
import {useRouteMatch, useLocation, Switch, Route, Redirect} from 'react-router-dom';

//Pages
import Spinner from '../../components/Spinner';
import CreatorsIntro from './CreatorsIntro/CreatorsIntro';
import CreatorForm from './CreatorForm/CreatorForm';
const DashboardRouter = React.lazy(() => import('./CreatorDashboard/Router'));

const Router = (props) => {
    const {path} = useRouteMatch();
    const location = useLocation();

    const isCreator = useSelector(state => state.user.isCreator);

    return (
        <React.Suspense fallback={<Spinner/>}>
            <Switch location={location}>
                {isCreator && 
                    <Route path={`${path}/dashboard`} component={DashboardRouter}/>}
                <Route path={`${path}/join`} component={CreatorForm}/>
                <Route path={`${path}/become`} component={CreatorsIntro}/>
                <Redirect to="/"/>
            </Switch>
        </React.Suspense>
    );
}

export default Router;