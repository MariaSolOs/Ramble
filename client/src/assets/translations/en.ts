import type { TranslationRecord } from '../../models/translation';

const englishTranslation: TranslationRecord = {
    Home: {
        searchTitle: 'Experience different.',
        searchSubtitle: 'Discover and attend unique experiences',
        searchbarPlaceholder: 'Select a city',
        exploreButton: 'Start exploring',
        personButtonLabel: 'Person',
        peopleButtonLabel: 'People',
        partakeTitle: 'Partake in unforgettable moments',
        partakeSubtitle: 'Experiences are unique activities organized by passionate Creators who wish to share their expertise and give their guests a privileged access to their universe.',
        adventureTitle: 'With friends, family, on your own, or with your significant other.',
        adventureSubtitle: 'Turn every occasion into a memorable adventure.'
    },

    Navbar: {
        signUp: 'Sign up',
        logIn: 'Log in',
        becomeCreator: 'Become a Creator'
    },

    ProfileMenu: {
        profile: 'View Profile',
        newExperience: 'New Experience',
        logout: 'Logout'
    },

    Footer: {
        supportColumnName: 'Support',
        supportLink: '24/7 Customer Service',
        socialColumnName: 'Social',
        languageColumnName: 'Language',
        languageChip: 'Français',
        copyright: '2021 Ramble Technologies Inc'
    },

    CustomerServiceDialog: {
        title: 'Customer service',
        message: '24/7 service to help you anywhere, anytime'
    },

    SignUpDialog: {
        signUp: 'Sign up', 
        logIn: 'Log in',
        firstName: 'First name',
        lastName: 'Last name',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm password',
        alreadyHaveAccount: 'Already have an account?',
        continue: 'Continue',
        passwordMismatch: "The passwords don't match."
    },

    LogInDialog: {
        logIn: 'Log in',
        email: 'Email',
        password: 'Password',
        forgotPassword: 'I forgot my password',
        rememberMe: 'Remember me'
    },

    ForgotPasswordDialog: {
        enterEmailTitle: 'Enter your email address',
        sendLinkMessage: "We'll send you a link so that you can create a new password.",
        resetPassword: 'Reset my password',
        emailSent: 'The email is on its way!'
    },

    ResetPasswordDialog: {
        newPassword: 'New password',
        confirmPassword: 'Confirm your new password',
        resetPassword: 'Reset my password',
        passwordMismatch: "The passwords don't match."
    },

    ErrorDialog: {
        title: "Sorry 'bout that."
    },

    SearchExperiences_Searchbar: {
        personButtonLabel: 'Person',
        peopleButtonLabel: 'People',
        search: 'Search',
        titlePlaceholder: 'Search experiences'
    },

    ExperienceCard: {
        perConnection: 'per connection',
        perPerson: 'per person',
        online: 'online'
    }
}

export default englishTranslation;