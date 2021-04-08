import React, { useEffect } from 'react';
import useNumberField from '../../../../hooks/useNumberField/useNumberField';
import { CapacityText as text } from '../SlidesText';

import Tip from '../../../../components/Tip/Tip';

import { makeStyles } from '@material-ui/core/styles';
import styles from './QuickInfosStyles';
const useStyles = makeStyles(styles);

const Capacity = ({ capacity, submitInput, lang }) => {
    const classes = useStyles();

    const [currentCapacity, CapacityField] = useNumberField({
        min: 1,
        initval: capacity,
        step: 1,
        getlabel: num => num > 1? text.people[lang] : text.person[lang], 
    });

    useEffect(() => {
        submitInput('capacity', currentCapacity);
    }, [currentCapacity, submitInput]);

    return (
        <>
            <div>
                <h1 className={classes.title}>
                    {text.infos[lang]}
                    <span className={classes.greyCaps}>3 of 4</span>
                </h1>
            </div>
            <div className={classes.formGroup}>
                <h2 className={classes.title}>{text.title[lang]}</h2>
                <p className={classes.description}>{text.desc[lang]}</p>
                <Tip className={classes.tip}>{text.tip[lang]}</Tip>
                <div className={classes.numField}>{CapacityField}</div>
            </div>
        </>
    );
}

export default Capacity;