import { Switch, Route } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';

import { isLoggedInVar } from 'apollo-cache';
import { SnackbarContextProvider } from 'context/snackbarContext';

import Navbar from 'components/Navbar/Navbar';
import Snackbar from 'components/Snackbar';
import LogInForm from 'pages/LogInForm/LogInForm';
import ApprovalGallery from 'pages/ApprovalGallery';
import ViewExperience from 'pages/ViewExperience/ViewExperience';
import DeleteGallery from 'pages/DeleteGallery';
import ReviewsGallery from 'pages/ReviewsGallery/ReviewsGallery';
import GlobalStyles from './GlobalStyles';

const App = () => {
    const isLoggedIn = useReactiveVar(isLoggedInVar);

    return (
        <GlobalStyles>
            <SnackbarContextProvider>
                <Snackbar />
                {isLoggedIn && <Navbar />}
                <Switch>
                    {isLoggedIn && 
                    <>
                        <Route path="/view/:experienceId" component={ViewExperience} />
                        <Route path="/approve-exp" component={ApprovalGallery} />
                        <Route path="/delete-exp" component={DeleteGallery} />
                        <Route path="/reviews" component={ReviewsGallery} />
                    </>}
                    <Route path="/" component={LogInForm} />
                </Switch>
            </SnackbarContextProvider>
        </GlobalStyles>
    );
}

export default App;