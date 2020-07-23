import React from 'react';

import lightbulbSVG from './images/actOut_lightbulb.svg';
import cloudSVG from './images/actOut_cloud.svg';
import walletSVG from './images/actOut_wallet.svg';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './GetYourActOutStyles';
const useStyles = makeStyles(styles);

const GetYourActOut = () => {
    const classes = useStyles();

    return ( 
        <div className={classes.root}>
            <div>
                <h1 className={classes.title}>
                    Get your act <div>out there.<span className={classes.underline}/></div>
                </h1>
                <div className={classes.graph}>
                    <div>
                        <div className={classes.graphItem}>
                            <div>
                                <img src={lightbulbSVG} alt="Lightbulb"/>
                            </div>
                            <p>Find a unique way to share your passion</p>
                        </div>
                        <div className={classes.graphItem}>
                            <div>
                                <img src={cloudSVG} alt="Cloud"/>
                            </div>
                            <p>Bring people into your own world</p>
                        </div>
                        <div className={classes.graphItem}>
                            <div>
                            <img src={walletSVG} alt="Wallet"/>
                            </div>
                            <p>Make money while sharing what really matters to you</p>
                        </div>
                    </div>
                    <div className={classes.underline}/>
                </div>
            </div>
        </div>
    );
}

export default GetYourActOut;  