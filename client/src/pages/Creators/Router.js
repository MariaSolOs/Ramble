import React from 'react';
import {useRouteMatch, useLocation, Switch, Route, Redirect} from 'react-router-dom';

//Pages
import CreatorsIntro from './CreatorsIntro/CreatorsIntro';

const Router = (props) => {
    const {path} = useRouteMatch();
    const location = useLocation();

    return (
        <Switch location={location}>
            <Route path={`${path}/become`} component={CreatorsIntro}/>
            <Redirect to="/"/>
        </Switch>
    );
}

export default Router;