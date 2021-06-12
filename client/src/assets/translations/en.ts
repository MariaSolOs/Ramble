import type { TranslationRecord } from 'models/translation';

const englishTranslation: TranslationRecord = {
    Home: {
        experienceTitle: 'experience different.',
        discoverTitle: 'Discover our experiences',
        seeAllButton: 'See all',
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
    },

    CategoryBox: {
        taste: 'Taste',
        create: 'Create',
        relax: 'Relax',
        learn: 'Learn',
        move: 'Move'
    },

    Experience: {
        online: 'online',
        duration: 'Duration',
        upTo: 'Up to',
        person: 'Person',
        people: 'People',
        language: 'Langue',
        languages: 'Languages',
        ageRestriction: 'Age restriction',
        hostedBy: 'Hosted by',
        aboutCreator: 'About creator',
        planning: 'Planning', 
        included: "What's included", 
        toBring: 'What to bring',
        location: 'Location'
    },
    
    ShareExperienceDialog: {
        shareExperience: 'Share this experience',
        copyLink: 'Copy link'
    },

    ViewExperience: {
        bookExperience: 'Book experience',
        perConnection: 'per connection',
        perPerson: 'per person',
        seeDates: 'See dates'
    },

    BecomeACreator: {
        becomeTitle: 'Become a Creator.',
        shareTitle: 'Share your passion.',
        getPaidTitle: 'Get paid.',
        getStarted: 'Get Started',
        currentCreators1: 'Meet current',
        currentCreators2: 'Creators',
        actTitle1: 'Get your act', 
        actTitle2: 'out there.',
        lightbulbText: 'Find a unique way to share your passion',
        cloudText: 'Bring people into your own world',
        walletText: 'Make money while sharing what really matters to you'
    },

    CreatorForm: {
        headerTitle: 'Before giving life to your experience we would like to get to know you a little bit better.',
        profilePicture: 'Profile picture',
        showSmile: 'Show us your best smile',
        aboutYouTitle: 'About you',
        aboutYouSubtitle: 'Tell us a bit about yourself. How would your friends describe you?',
        aboutYouTip: "Include fun facts, what you're passionate about, your professional experience and other pertinent information.",
        phoneNumberTitle: "What's your phone number?",
        phoneNumberSubtitle: 'Only us and guests who book your experience will have access to your phone number.',
        phoneNumberError: 'Please provide a valid phone number', 
        idTitle: 'Government ID',
        idSubtitle: "That just allows us to check if it's really you. By verifying the identity of guests and Creators, we make sure everyone feels safe.",
        idTip1: "Your ID won't be shared with anyone else.",
        idTip2: "Please upload an ID with your picture on it, like your driver's license, passport or identity card. We accept .jpg, .jpeg or .png files.",
        front: 'Front',
        back: 'Back',
        frontIdText: 'Show the front of your ID',
        backIdText: 'Add the back of your ID',
        addFront: 'Add front',
        addBack: 'Add back',
        done: 'Done'
    }
}

export default englishTranslation;