export type TranslationRecord = {
    Home: Record<'searchTitle' | 'searchSubtitle' | 'searchbarPlaceholder' | 'exploreButton' | 'personButtonLabel' | 'peopleButtonLabel' | 'partakeTitle' | 'partakeSubtitle' | 'adventureTitle' | 'adventureSubtitle', string>;

    Navbar: Record<'signUp' | 'logIn' | 'becomeCreator', string>;

    ReferBox: Record<'instruction1' | 'instruction2' | 'instruction3', string>;

    Footer: Record<'supportColumnName' | 'supportLink' | 'socialColumnName' | 'languageColumnName' | 'languageChip' | 'copyright', string>;

    CustomerServiceDialog: Record<'title' | 'message', string>;

    SignUpDialog: Record<'signUp' | 'logIn' | 'firstName' | 'lastName' | 'email' | 'password' | 'confirmPassword' | 'alreadyHaveAccount' | 'continue' | 'passwordMismatch', string>;

    LogInDialog: Record<'logIn' | 'email' | 'password' | 'forgotPassword' | 'rememberMe', string>;

    ErrorDialog: Record<'title', string>;
}