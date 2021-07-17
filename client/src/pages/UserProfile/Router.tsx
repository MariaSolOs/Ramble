import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';

import PersonalInformation from './PersonalInformation/PersonalInformation';
import Experiences from './Experiences/Experiences';

const Router = () => {
    const location = useLocation();
    const { path } = useRouteMatch();

    return (
        <Switch location={location}>
            <Route path={`${path}/personal-information`} component={PersonalInformation} />
            <Route path={`${path}/experiences`} component={Experiences} />
        </Switch>
    );
}

export default Router;