import React, { useState, useEffect } from 'react';
import useNumberField from '../../../../hooks/useNumberField/useNumberField';
import { AgeText as text } from '../SlidesText';

import Checkbox from '../../../../components/Input/Checkbox/Checkbox';
import PersonIcon from '@material-ui/icons/Person';
import Tip from '../../../../components/Tip/Tip';

import { makeStyles } from '@material-ui/core/styles';
import styles from './QuickInfosStyles';
const useStyles = makeStyles(styles);

const Age = ({ ageRestricted, ageRequired, submitInput, lang }) => {
    const classes = useStyles();

    // Manage input changes
    const [showAgeReq, setShowAgeReq] = useState(ageRestricted);

    const handleAgeRestrChange = (e) => {
        if(e.target.name === 'ageTrue') {
            submitInput('ageRestricted', true);
            setShowAgeReq(true);
        } else { // e.target.name === 'ageFalse'
            submitInput('ageRestricted', false);
            setShowAgeReq(false);
        }
    }
    const [ageReq, ageReqField] = useNumberField({
        min: 5, 
        initval: ageRequired,
        step: 1,
        getlabel: () => text.yearsOld[lang], 
        name: 'ageRequired',
        startadornment: <PersonIcon/>,
    });
    useEffect(() => submitInput('ageRequired', ageReq), [ageReq, submitInput]);

    return (
        <>
            <div>
                <h1 className={classes.title}>
                    {text.infos[lang]}
                    <span className={classes.greyCaps}>4 of 4</span>
                </h1>
            </div>
            <div className={classes.formGroup}>
                <h2 className={classes.title}>{text.title[lang]}</h2>
                <p className={classes.description}>{text.desc[lang]}</p>
                <Tip>{text.tip[lang]}</Tip>
                <div className={classes.checkboxRow}>
                    <div>
                        <Checkbox 
                        checked={ageRestricted} 
                        onChange={handleAgeRestrChange}
                        name="ageTrue"/>
                        <label className={classes.description}>
                            {text.yes[lang]}
                        </label>
                    </div>
                    <div>
                        <Checkbox
                        checked={!ageRestricted} 
                        onChange={handleAgeRestrChange}
                        name="ageFalse"/>
                        <label className={classes.description}>
                            {text.no[lang]}
                        </label>
                    </div>
                </div>
            </div>
            {showAgeReq &&
                <div className={classes.formGroup}>
                    <label 
                    htmlFor="ageRequired" 
                    className={classes.greyCaps}
                    style={{ display: 'block', margin: '1rem 0 0.5rem' }}>
                        {text.title[lang]}
                    </label>
                    <div className={classes.numField}>{ageReqField}</div>
                </div>}
        </>
    );
}

export default Age;