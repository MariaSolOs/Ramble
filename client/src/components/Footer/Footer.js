import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../../store/actions/ui';
import text from './FooterText';

import CustomerServiceDialog from '../Dialogs/CustomerServiceDialog/CustomerServiceDialog';
import Chip from '@material-ui/core/Chip';
import LanguageIcon from '@material-ui/icons/Language';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';

import { makeStyles } from '@material-ui/core/styles';
import styles from './FooterStyles';
const useStyles = makeStyles(styles);

const Footer = () => {
    const lang = useSelector(state => state.ui.language);
    const dispatch = useDispatch();

    const classes = useStyles();

    const [showCustService, setShowCustService] = useState(false);
    const openCustService = () => { setShowCustService(true); }
    const closeCustService = () => { setShowCustService(false); }

    const handleLangChange = () => {
        const newLang = lang === 'en' ? 'fr' : 'en';
        dispatch(setLanguage(newLang));
        window.localStorage.setItem('lang', newLang);
    }

    return (
        <>
        <CustomerServiceDialog 
        open={showCustService}
        onClose={closeCustService}
        lang={lang}/>
        <footer className={classes.footer}>
            <div className={classes.header}>ramble</div>
            <div className={classes.body}>
                <div className={classes.bodyCol}>
                    <p className={classes.colTitle}>Support</p>
                    <span className="open-dialog" onClick={openCustService}>
                        {text.supportLink[lang]}
                    </span>
                </div>
                <div className={classes.bodyCol}>
                    <p className={classes.colTitle}>{text.socialCol[lang]}</p>
                    <div>
                        <a 
                        href="https://www.instagram.com/experienceramble/"
                        rel="noopener noreferrer" 
                        target="_blank">
                            <FontAwesomeIcon icon={faInstagram} 
                            className={`${classes.icon} instagram`}/>
                        </a>
                        <a 
                        href="https://www.facebook.com/experienceramble"
                        rel="noopener noreferrer" 
                        target="_blank">
                            <FontAwesomeIcon icon={faFacebook} 
                            className={`${classes.icon} facebook`}/>
                        </a>
                    </div>
                </div>
                <div className={classes.bodyCol}>
                    <p className={classes.colTitle}>{text.languageCol[lang]}</p>
                    <div>
                        <Chip 
                        icon={<LanguageIcon/>} 
                        label={text.languageChip[lang]}
                        className={classes.chip}
                        clickable
                        onClick={handleLangChange}/>
                    </div>
                </div>
            </div>
            <div className={classes.bottom}>
                <p>
                    &copy; {text.copyright[lang]}
                </p>
            </div>
        </footer>
        </>
    );
}

export default Footer;