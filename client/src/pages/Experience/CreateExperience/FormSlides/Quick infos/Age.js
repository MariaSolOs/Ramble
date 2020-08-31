import React, {useState, useEffect} from 'react';
import useNumberField from '../../../../../hooks/useNumberField/useNumberField';

//Components and icons
import Checkbox from '../../../../../components/Input/Checkbox/Checkbox';
import PersonIcon from '@material-ui/icons/Person';
import Tip from '../../../../../components/Tip/Tip';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './QuickInfosStyles';
const useStyles = makeStyles(styles);

const Age = ({ageRestricted, ageRequired, submitInput}) => {
    const classes = useStyles();

    //Manage input changes
    const [showAgeReq, setShowAgeReq] = useState(ageRestricted);

    const handleAgeRestrChange = (e) => {
        if(e.target.name === 'ageTrue') {
            submitInput('ageRestricted', true);
            setShowAgeReq(true);
        } else { //e.target.name === 'ageFalse'
            submitInput('ageRestricted', false);
            setShowAgeReq(false);
        }
    }
    const [ageReq, ageReqField] = useNumberField({
        min: 5, 
        initval: ageRequired,
        step: 1,
        getlabel: () => 'years old', 
        name: 'ageRequired',
        startadornment: <PersonIcon/>,
    });
    useEffect(() => submitInput('ageRequired', ageReq), [ageReq, submitInput]);

    return (
        <>
            <div>
                <h1 className={classes.title}>
                    Quick Infos
                    <span className={classes.greyCaps}>4 of 4</span>
                </h1>
            </div>
            <div className={classes.formGroup}>
                <h2 className={classes.title}>Age restriction</h2>
                <p className={classes.description}>
                    Do your guests have to be a certain age to access this experience?
                </p>
                <Tip>
                    If your experience includes alcohol or any other age-restricted
                    matter, an age limit must be fixed accordingly.
                </Tip>
                <div className={classes.checkboxRow}>
                    <div>
                        <Checkbox 
                        checked={ageRestricted} 
                        onChange={handleAgeRestrChange}
                        name="ageTrue"/>
                        <label className={classes.description}>Yes</label>
                    </div>
                    <div>
                        <Checkbox
                        checked={!ageRestricted} 
                        onChange={handleAgeRestrChange}
                        name="ageFalse"/>
                        <label className={classes.description}>No</label>
                    </div>
                </div>
            </div>
            {showAgeReq &&
                <div className={classes.formGroup}>
                    <label 
                    htmlFor="ageRequired" 
                    className={classes.greyCaps}
                    style={{ display: 'block', margin: '1rem 0 0.5rem' }}>
                        Age restriction
                    </label>
                    <div className={classes.numField}>{ageReqField}</div>
                </div>}
        </>
    );
}

export default Age;