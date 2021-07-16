import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';

import Layout from './Layout';
import BookingRequests from './BookingRequests/BookingRequests';
import CreatedExperiences from './CreatedExperiences/CreatedExperiences';

const Router = () => {
    const location = useLocation();
    const { path } = useRouteMatch();

    return (
        <Layout>
            <Switch location={location}>
                <Route path={`${path}/booking-requests`} component={BookingRequests} />
                <Route path={`${path}/experiences`} component={CreatedExperiences} />
            </Switch>
        </Layout>
    );
}

export default Router;