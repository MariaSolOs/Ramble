import React, {useEffect} from 'react';
import useNumberField from '../../../../hooks/useNumberField/useNumberField';

import Tip from '../../../../components/Tip/Tip';

import {makeStyles} from '@material-ui/core/styles';
import styles from './QuickInfosStyles';
const useStyles = makeStyles(styles);

const Capacity = ({capacity, submitInput}) => {
    const classes = useStyles();

    const [currentCapacity, CapacityField] = useNumberField({
        min: 1,
        initval: capacity,
        step: 1,
        getlabel: num => num > 1? 'People' : 'Person', 
    });

    //Update form value
    useEffect(() => {
        submitInput('capacity', currentCapacity);
    }, [currentCapacity, submitInput]);

    return (
        <>
            <div>
                <h1 className={classes.title}>
                    Quick Infos
                    <span className={classes.greyCaps}>3 of 4</span>
                </h1>
            </div>
            <div className={classes.formGroup}>
                <h2 className={classes.title}>Capacity</h2>
                <p className={classes.description}>Set a maximum number of guests for your experience.</p>
                <Tip className={classes.tip}>
                    Consider the nature of your experience. Some experiences require a certain intimacy
                    and others work better with a bigger group.
                </Tip>
                <div className={classes.numField}>{CapacityField}</div>
            </div>
        </>
    );
}

export default Capacity;