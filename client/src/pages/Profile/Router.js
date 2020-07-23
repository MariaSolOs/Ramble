import React from 'react';
import {useRouteMatch, Switch, Route} from 'react-router-dom';

//Pages
import Layout from './Layout/Layout';
import PastExperiences from './UserExperiences/UserPastExperiences';
import SavedExperiences from './UserExperiences/UserSavedExperiences';
import Info from './UserInfo';

const Router = (props) => {
    const {path} = useRouteMatch();

    return (
        <Layout>
            <Switch>
                <Route path={`${path}/exp/past`}>
                    <PastExperiences/>
                </Route>
                <Route path={`${path}/exp/saved`}>
                    <SavedExperiences/>
                </Route>
                <Route path={`${path}/info`}>
                    <Info/>
                </Route>
            </Switch>
        </Layout>
    );
}

export default Router;