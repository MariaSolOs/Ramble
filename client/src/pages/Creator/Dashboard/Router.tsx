import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';

import Layout from './Layout';
import BookingRequests from './BookingRequests/BookingRequests';

const Router = () => {
    const location = useLocation();
    const { path } = useRouteMatch();

    return (
        <Layout>
            <Switch location={location}>
                <Route path={`${path}/booking-requests`} component={BookingRequests} />
            </Switch>
        </Layout>
    );
}

export default Router;