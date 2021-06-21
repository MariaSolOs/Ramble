import type { 
    Category as ExperienceCategory, 
    CreationStep as ExperienceCreationStep
} from './experience';

export type TranslationRecord = {
    Home: Record<'experienceTitle' | 'discoverTitle' | 'seeAllButton' | 'partakeTitle' | 'partakeSubtitle' | 'adventureTitle' | 'adventureSubtitle', string>;

    Navbar: Record<'signUp' | 'logIn' | 'becomeCreator' | 'creatorDashboard', string>;

    ProfileMenu: Record<'profile' | 'newExperience' | 'logout', string>,

    Footer: Record<'supportColumnName' | 'supportLink' | 'socialColumnName' | 'languageColumnName' | 'languageChip' | 'copyright', string>;

    CustomerServiceDialog: Record<'title' | 'message', string>;

    SignUpDialog: Record<'signUp' | 'logIn' | 'firstName' | 'lastName' | 'email' | 'password' | 'confirmPassword' | 'alreadyHaveAccount' | 'continue' | 'passwordMismatch', string>;

    LogInDialog: Record<'logIn' | 'email' | 'password' | 'forgotPassword' | 'rememberMe', string>;

    ForgotPasswordDialog: Record<'enterEmailTitle'| 'sendLinkMessage' | 'resetPassword' | 'emailSent', string>;

    ResetPasswordDialog: Record<'newPassword' | 'confirmPassword' | 'resetPassword' | 'passwordMismatch', string>;

    ErrorDialog: Record<'title', string>;

    SearchExperiences_Searchbar: Record<'personButtonLabel' | 'peopleButtonLabel' | 'search' | 'titlePlaceholder', string>;

    ExperienceCard: Record<'perConnection' | 'perPerson' | 'online', string>;

    CategoryBox: Record<ExperienceCategory, string>;

    Experience: Record<'online' | 'duration' | 'upTo' | 'person' | 'people' | 'language' | 'languages' | 'ageRestriction' | 'hostedBy' | 'aboutCreator' | 'planning' | 'included' | 'toBring' | 'location', string>;

    ShareExperienceDialog: Record<'shareExperience' | 'copyLink', string>;

    ViewExperience: Record<'bookExperience' | 'perConnection' | 'perPerson' | 'seeDates', string>;

    BecomeACreator: Record<'becomeTitle' | 'shareTitle' | 'getPaidTitle' | 'getStarted' | 'currentCreators1' | 'currentCreators2' | 'actTitle1' | 'actTitle2' | 'lightbulbText' | 'cloudText' | 'walletText', string>;

    CreatorForm: Record<'headerTitle' | 'profilePicture' | 'showSmile' | 'aboutYouTitle' | 'aboutYouSubtitle' | 'aboutYouTitle' | 'aboutYouTip' | 'phoneNumberTitle' | 'phoneNumberSubtitle' | 'phoneNumberError' | 'idTitle' | 'idSubtitle' | 'idTip1' | 'idTip2' | 'front' | 'back' | 'frontIdText' | 'backIdText' | 'addFront' | 'addBack' | 'done', string>;

    CreatorForm_StripeMessage: Record<'formSubmittedMessage' | 'stripeMessage' | 'continueWithStripe', string>;

    StripeRedirect: Record<'onboardingMessage' | 'help' | 'continueWithStripe', string>;

    CreateExperience: Record<'animationTitle1' | 'animationTitle2', string>;
    
    CreateExperience_Layout: Record<'back' | 'next' | ExperienceCreationStep, string>;

    BuilderSlides_Location: Record<'experienceTypeQuestion' | 'online' | 'onlineOption' | 'inPerson' | 'inPersonOption' | 'locationTitle' | 'cityQuestion' | 'meetingPoint' | 'meetingPointQuestion' | 'accessTip' | 'sharedInfoRemark' | 'zoomPMI' | 'zoomPassword' | 'zoomPMIHelp' | 'zoomPasswordHelp' | 'zoomDocs', string>;

    BuilderSlides_Title: Record<'title' | 'subtitle' | 'tip', string>;

    BuilderSlides_Category: Record<'title' | 'of' | 'question1' | 'question2' | 'tip', string>;

    BuilderSlides_Planning: Record<'title' | 'subtitle' | 'textfieldLabel', string>;

    BuilderSlides_Duration: Record<'title' | 'subtitle' | 'tip' | 'hour' | 'hours' | 'halfHour', string>;

    BuilderSlides_Language: Record<'title' | 'subtitle' | 'tip' | 'maxLanguagesMessage', string>;
    
    BuilderSlides_Capacity: Record<'title' | 'subtitle' | 'tip' | 'person' | 'people', string>;
}