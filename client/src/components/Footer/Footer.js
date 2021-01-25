import React, {useState} from 'react';
// import {Link} from 'react-router-dom';

//Components and icons
import CustomerServiceDialog from '../Dialogs/CustomerServiceDialog/CustomerServiceDialog';
import Chip from '@material-ui/core/Chip';
import LanguageIcon from '@material-ui/icons/Language';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook} from '@fortawesome/free-brands-svg-icons/faFacebook';
import {faInstagram} from '@fortawesome/free-brands-svg-icons/faInstagram';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './FooterStyles';
const useStyles = makeStyles(styles);

const Footer = () => {
    const classes = useStyles();

    const [showCustService, setShowCustService] = useState(false);
    const openCustService = () => { setShowCustService(true); }
    const closeCustService = () => { setShowCustService(false); }

    return (
        <>
        <CustomerServiceDialog 
        open={showCustService}
        onClose={closeCustService}/>
        <footer className={classes.footer}>
            <div className={classes.header}>ramble</div>
            <div className={classes.body}>
                <div className={classes.bodyCol}>
                    <p className={classes.colTitle}>Support</p>
                    <span className="open-dialog" onClick={openCustService}>
                        24/7 Customer Service
                    </span>
                </div>
                <div className={classes.bodyCol}>
                    <p className={classes.colTitle}>Social</p>
                    <div>
                        <a href="/">
                            <FontAwesomeIcon icon={faInstagram} 
                            className={`${classes.icon} instagram`}/>
                        </a>
                        <a href="https://www.facebook.com/ramblecanada"
                        rel="noopener noreferrer" 
                        target="_blank">
                            <FontAwesomeIcon icon={faFacebook} 
                            className={`${classes.icon} facebook`}/>
                        </a>
                    </div>
                </div>
                <div className={classes.bodyCol}>
                    <p className={classes.colTitle}>Language</p>
                    <div>
                        <Chip icon={<LanguageIcon/>} label="English" className={classes.chip}/>
                    </div>
                </div>
            </div>
            <div className={classes.bottom}>
                <p>&copy; 2020 Ramble Technologies Inc</p>
                <div>
                    {/* TODO: Add real links to pages here */}
                    <span className="link">Terms of service</span>
                    <span className="link">Privacy Policy</span>
                </div>
            </div>
        </footer>
        </>
    );
}

export default React.memo(Footer);