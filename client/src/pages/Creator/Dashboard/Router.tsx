import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';

import Layout from './Layout';

const Router = () => {
    const location = useLocation();
    const { path } = useRouteMatch();

    return (
        <Layout>
            <Switch location={location}>
                <Route path={`${path}/booking-requests`} />
            </Switch>
        </Layout>
    );
}

export default Router;