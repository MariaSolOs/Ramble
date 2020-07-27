import React from 'react';
import {Link} from 'react-router-dom';

//Components and icons
import Chip from '@material-ui/core/Chip';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LanguageIcon from '@material-ui/icons/Language';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook} from '@fortawesome/free-brands-svg-icons/faFacebook';
import {faInstagram} from '@fortawesome/free-brands-svg-icons/faInstagram';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './MainFooterStyles';
const useStyles = makeStyles(styles);

const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.root}>
            <div className={classes.header}>ramble</div>
            <div className={classes.body}>
                <div className="body-col">
                    <p className={classes.colTitle}>Company</p>
                    {/* TODO: Add real links to pages here */}
                    <Link to="/about">About us</Link>
                    <Link to="/jobs">Jobs</Link>
                </div>
                <div className="body-col">
                    <p className={classes.colTitle}>Support</p>
                    {/* TODO: Add real links to pages here */}
                    <Link to="/support">24/7 Customer Service</Link>
                </div>
                <div className="body-col">
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
                <div className="body-col">
                    <p className={classes.colTitle}>Language & Currency</p>
                    <div>
                        <Chip icon={<LanguageIcon/>} label="English" className={classes.chip}/>
                        <Chip icon={<AttachMoneyIcon/>} label="USD" className={classes.chip}/>
                    </div>
                </div>
            </div>
            <div className={classes.bottom}>
                <Link to="/admin">
                    &copy; 2020 Ramble Technologies Inc
                </Link>
                <div>
                    {/* TODO: Add real links to pages here */}
                    <p>+1 514 654-7156</p>
                    <Link to="/terms">Terms of service</Link>
                    <Link to="/privPolicy">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    );
}

export default React.memo(Footer);