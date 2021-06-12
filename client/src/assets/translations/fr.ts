import type { TranslationRecord } from 'models/translation';

const frenchTranslation: TranslationRecord = {
    Home: {
        experienceTitle: "découvrez l'inoubliable", 
        discoverTitle: 'Découvrez notre expériences',
        seeAllButton: 'Tout voir',
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
    },

    CategoryBox: {
        taste: 'Goutez',
        create: 'Créez',
        relax: 'Relaxez',
        learn: 'Apprenez',
        move: 'Bougez'
    },

    Experience: {
        online: 'en ligne',
        duration: 'Durée',
        upTo: "Jusqu'à",
        person: 'Personne',
        people: 'Personnes',
        language: 'Langue',
        languages: 'Langues',
        ageRestriction: 'Âge requis',
        hostedBy: 'Animé par',
        aboutCreator: 'À propos du Créateur',
        planning: 'Ce que vous ferez',
        included: 'Ce qui est inclus',
        toBring: 'Quoi emporter',
        location: 'Localisation'
    },

    ShareExperienceDialog: {
        shareExperience: 'Partager cette expérience',
        copyLink: "Copier l'url"
    },
    
    ViewExperience: {
        bookExperience: 'Réserver',
        perConnection: 'par connexion',
        perPerson: 'par personne',
        seeDates: 'Voir les disponibilités'
    },

    BecomeACreator: {
        becomeTitle: 'Devenez un créateur.',
        shareTitle: 'Partagez votre passion.',
        getPaidTitle: "Faites de l'argent.",
        getStarted: 'Débuter',
        currentCreators1: 'Rencontrez quelques', 
        currentCreators2: 'Créateurs',
        actTitle1: 'Partagez votre passion',
        actTitle2: 'dès maintenant.',
        lightbulbText: 'Trouvez une manière unique de partager votre passion',
        cloudText: 'Invitez des gens dans votre univers',
        walletText: 'Transmettez ce qui vous passionne, tout en étant payé'
    },

    CreatorForm: {
        headerTitle: 'Avant de donner vie à votre expérience, nous aimerions vous connaître un peu mieux.',
        profilePicture: 'Photo de profil',
        showSmile: 'Montrez-nous votre plus beau sourire',
        aboutYouTitle: 'À propos de vous',
        aboutYouSubtitle: 'Parlez nous un peu de vous. Comment vos amis vous décriraient-ils?',
        aboutYouTip: "Incluez des faits amusants, ce qui vous passionne, votre expérience professionnelle et d'autres informations pertinentes.",
        phoneNumberTitle: 'Quel est votre numéro de téléphone?',
        phoneNumberSubtitle: 'Seuls nous et les invités qui réservent votre expérience auront accès à votre numéro de téléphone.',
        phoneNumberError: 'Veuillez indiquer un numéro de téléphone valable', 
        idTitle: "Pièce d'identité",
        idSubtitle: "Cela nous permet seulement de vérifier qu’il s’agît bien de vous. En vérifiant l'identité des invités et des créateurs, nous nous assurons que tout le monde se sent en sécurité.",
        idTip1: "Votre pièce d’identité ne sera partagée avec personne d'autre.",
        idTip2: "Veuillez télécharger une pièce d'identité avec votre photo, comme votre permis de conduire, votre passeport ou votre carte d'identité en fichier .jpg, .jpeg ou .png.",
        front: 'Recto',
        back: 'Verso',
        frontIdText: "Montrez le recto de votre pièce d'identité",
        backIdText: "Ajoutez le verso de votre pièce d'identité",
        addFront: 'Recto',
        addBack: 'Verso',
        done: 'Terminé'
    }
}

export default frenchTranslation;