import React from 'react';
import { GetYourActOutText as text } from '../CreatorsIntroText';

import lightbulbSVG from './images/actOut_lightbulb.svg';
import cloudSVG from './images/actOut_cloud.svg';
import walletSVG from './images/actOut_wallet.svg';

import { makeStyles } from '@material-ui/core/styles';
import styles from './GetYourActOutStyles';
const useStyles = makeStyles(styles);

const GetYourActOut = ({ lang }) => {
    const classes = useStyles();

    return ( 
        <div className={classes.root}>
            <div>
                <h1 className={classes.title}>
                    {text.act[lang][0]} <div>{text.act[lang][1]}<span className={classes.underline}/></div>
                </h1>
                <div className={classes.graph}>
                    <div>
                        <div className={classes.graphItem}>
                            <div>
                                <img src={lightbulbSVG} alt="Lightbulb"/>
                            </div>
                            <p>{text.bulbText[lang]}</p>
                        </div>
                        <div className={classes.graphItem}>
                            <div>
                                <img src={cloudSVG} alt="Cloud"/>
                            </div>
                            <p>{text.cloudText[lang]}</p>
                        </div>
                        <div className={classes.graphItem}>
                            <div>
                                <img src={walletSVG} alt="Wallet"/>
                            </div>
                            <p>{text.walletText[lang]}</p>
                        </div>
                    </div>
                    <div className={classes.underline}/>
                </div>
            </div>
        </div>
    );
}

export default GetYourActOut;  