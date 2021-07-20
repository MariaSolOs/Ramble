import { Switch, Route } from 'react-router-dom';

import LogInForm from 'pages/LogInForm/LogInForm';

import GlobalStyles from './GlobalStyles';

const App = () => {
    return (
        <GlobalStyles>
            <Switch>
                <Route path="/" component={LogInForm} />
            </Switch>
        </GlobalStyles>
    );
}

export default App;