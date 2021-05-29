import type { TranslationRecord } from '../../models/translation';

const frenchTranslation: TranslationRecord = {
    Home: {
        searchTitle: "Découvrez l'inoubliable", 
        searchSubtitle: 'Découvrez et participez à des expériences uniques',
        searchbarPlaceholder: 'Choisissez une ville',
        exploreButton: 'Explorer',
        personButtonLabel: 'Personne',
        peopleButtonLabel: 'Personnes',
        partakeTitle: 'Vivez des moments inoubliables',
        partakeSubtitle: 'Les expériences sont des activités uniques organisées par des Créateurs passionnés qui veulent partager leur expertise en donnant à leurs invités un accès privilégié à leur univers.',
        adventureTitle: "En famille, entre amis, seul ou en compagnie d'une personne bien spéciale.",
        adventureSubtitle: 'Faites de chaque occasion une aventure mémorable.'
    },

    Navbar: {
        signUp: "M'inscrire",
        logIn: 'Connexion',
        becomeCreator: 'Devenir un Créateur'
    },

    ProfileMenu: {
        profile: 'Profil',
        newExperience: 'Nouvelle expérience',
        logout: 'Déconnexion'
    },

    Footer: {
        supportColumnName: 'Support',
        supportLink: 'Support 24/7',
        socialColumnName: 'Réseaux sociaux',
        languageColumnName: 'Langue',
        languageChip: 'English',
        copyright: 'Technologies Ramble Inc'
    },

    CustomerServiceDialog: {
        title: 'Service à la clientèle',
        message: "Service 24/7 pour vous aider n'importe où, n'importe quand"
    },

    SignUpDialog: {
        signUp: "M'inscrire",
        logIn: 'Connexion',
        firstName: 'Prénom',
        lastName: 'Nom de famille',
        email: 'Courriel',
        password: 'Mot de passe',
        confirmPassword: 'Confirmer le mot de passe',
        alreadyHaveAccount: 'Vous avez déjà un compte?',
        continue: 'Continuer',
        passwordMismatch: 'Les mots de passe ne correspondent pas.'
    },

    LogInDialog: {
        logIn: 'Connexion',
        email: 'Courriel',
        password: 'Mot de passe',
        forgotPassword: 'Mot de passe oublié',
        rememberMe: 'Se souvenir de moi'
    },

    ForgotPasswordDialog: {
        enterEmailTitle: 'Entrez votre adresse courriel',
        sendLinkMessage: 'Nous vous enverrons un lien pour que vous puissiez changer votre mot de passe.',
        resetPassword: 'Réinitialiser mon mot de passe',
        emailSent: 'Le courriel est en route!'
    },

    ResetPasswordDialog: {
        newPassword: 'Nouveau mot de passe',
        confirmPassword: 'Confirmer le mot de passe',
        resetPassword: 'Réinitialiser le mot de passe',
        passwordMismatch: 'Les mots de passe ne correspondent pas.'
    },

    ErrorDialog: {
        title: 'Désolé!'
    },

    SearchExperiences_Searchbar: {
        personButtonLabel: 'Personne',
        peopleButtonLabel: 'Personnes',
        search: 'Explorer',
        titlePlaceholder: 'Découvrer des expériences'
    },

    ExperienceCard: {
        perConnection: 'par connexion',
        perPerson: 'par personne',
        online: 'en ligne'
    }
}

export default frenchTranslation;