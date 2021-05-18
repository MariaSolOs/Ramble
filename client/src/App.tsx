import { Switch, Route } from 'react-router-dom';

import LanguageProvider from './context/languageContext';

import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import GlobalStyles from './assets/styles/GlobalStyles';

const App = () => {
    return (
        <LanguageProvider>
            <GlobalStyles>
                <Navbar />
                <Switch>
                    <Route path="/" component={Home} />
                </Switch>
            </GlobalStyles>
        </LanguageProvider>
    );
}

export default App;