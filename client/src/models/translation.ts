export type TranslationRecord = {
    Home: Record<'experienceTitle' | 'discoverTitle' | 'seeAllButton' | 'partakeTitle' | 'partakeSubtitle' | 'adventureTitle' | 'adventureSubtitle', string>;

    Navbar: Record<'signUp' | 'logIn' | 'becomeCreator', string>;

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
}