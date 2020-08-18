import React from 'react';
import {useRouteMatch, Switch, Route, useLocation} from 'react-router-dom';

//Pages
import Layout from './Layout/Layout';
import PastExperiences from './UserExperiences/UserPastExperiences';
import SavedExperiences from './UserExperiences/UserSavedExperiences';
import Info from './UserInfo/UserInfo';
import PaymentInfo from './PaymentInfo/PaymentInfo';

//TODO: Add email suscriptions page
const Router = (props) => {
    const {path} = useRouteMatch();
    const location = useLocation();

    return (
        <Switch location={location}>
            <Layout>
                <Route path={`${path}/exp/past`}>
                    <PastExperiences/>
                </Route>
                <Route path={`${path}/exp/saved`}>
                    <SavedExperiences/>
                </Route>
                <Route path={`${path}/info`}>
                    <Info/>
                </Route>
                <Route path={`${path}/payInfo`}>
                    <PaymentInfo/>
                </Route>
            </Layout>
        </Switch>
    );
}

export default Router;