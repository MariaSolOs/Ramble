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
        becomeCreator: 'Become a Creator',
        creatorDashboard: 'Creator dashboard'
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
    },

    CreatorForm_StripeMessage: {
        formSubmittedMessage: 'Your form was submitted. All you have left to do is choose the way you want to receive your payments.',
        stripeMessage: 'In order to keep your information secure, all payments are handled and processed by Stripe.',
        continueWithStripe: 'Continue with Stripe'
    },

    StripeRedirect: {
        onboardingMessage: 'You’re almost there! Before you start creating, we need you to set up your payment information with Stripe.',
        help: 'If you need help, please let us know!',
        continueWithStripe: 'Continue with Stripe'
    },

    CreateExperience: {
        animationTitle1: 'Just like you.',
        animationTitle2: "We're all about creating special moments.",
    },
    
    CreateExperience_Layout: {
        back: 'Back',
        next: 'Next',
        location: 'Location',
        title: 'Title',
        category: 'Category',
        planning: 'Planning',
        duration: 'Duration',
        language: 'Language',
        capacity: 'Capacity',
        age: 'Required age',
        preview: 'Preview',
        included: "What's included",
        toBring: 'What to bring',
        price: 'Pricing',
        availabilities: 'Availabilities',
        review: 'Review and submit'
    },

    BuilderSlides_Location: {
        experienceTypeQuestion: 'What type of experience are you hosting?',
        online: 'Online',
        onlineOption: 'Host your experience via Zoom',
        inPerson: 'In person',
        inPersonOption: 'Meet your guests in person',
        locationTitle: 'Location',
        cityQuestion: 'In which city will your experience take place?',
        meetingPoint: 'Meeting point', 
        meetingPointQuestion: 'Where exactly will you meet your guests?',
        accessTip: 'Choose an easily accessible location.',
        sharedInfoRemark: 'This information will be shared with guests only after booking.',
        zoomPMI: 'ZOOM MEETING PERSONAL ID (PMI)',
        zoomPassword: 'MEETING PASSWORD',
        zoomPMIHelp: 'For help on setting your PMI, check the',
        zoomPasswordHelp: 'For help on managing your password, check the',
        zoomDocs: 'Zoom docs',
    },

    BuilderSlides_Title: {
        title: 'Title',
        subtitle: 'Give your experience a compelling title.',
        tip: 'Try keeping it short and exciting.'
    },

    BuilderSlides_Category: {
        title: 'Category',
        of: 'of',
        question1: 'Which category would you say your experience fits the most?',
        question2: 'Which other category would your experience fit in?',
        tip: 'Add a second category to give a unique touch to your experience.'
    },

    BuilderSlides_Planning: {
        title: 'Planning',
        subtitle: 'Please provide a precise summary of your experience. This description will be displayed on the experience page.',
        textfieldLabel: 'Describe your experience'
    },

    BuilderSlides_Duration: {
        title: 'Duration', 
        subtitle: 'How long is your experience?',
        tip: 'Most experiences are between 1 to 3 hours.',
        hour: 'hour',
        hours: 'hours',
        halfHour: 'and 30 minutes'
    },

    BuilderSlides_Language: {
        title: 'Language',
        subtitle: 'In which language will you interact with your guests?',
        tip: 'You should host your experience in a language you speak fluently.',
        maxLanguagesMessage: 'You can pick a maximum of 3 languages.'
    },

    BuilderSlides_Capacity: {
        title: 'Capacity', 
        subtitle: 'Set a maximum number of guests for your experience.',
        tip: 'Consider the nature of your experience. Some experiences require a certain intimacy and others work better with a bigger group.',
        people: 'People',
        person: 'Person'
    }
}

export default englishTranslation;