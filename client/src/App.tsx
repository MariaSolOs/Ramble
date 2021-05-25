import { Switch, Route } from 'react-router-dom';

import LanguageProvider from './context/languageContext';
import GlobalStyles from './assets/styles/GlobalStyles';

import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import SignUpDialog from './components/AuthDialogs/SignUpDialog';
import LogInDialog from './components/AuthDialogs/LogInDialog';
import ErrorDialog from './components/ErrorDialog/ErrorDialog';

const App = () => {
    return (
        <LanguageProvider>
            <GlobalStyles>
                <Navbar />
                <SignUpDialog />
                <LogInDialog />
                <ErrorDialog />
                <Switch>
                    <Route path="/" component={Home} />
                </Switch>
            </GlobalStyles>
        </LanguageProvider>
    );
}

export default App;