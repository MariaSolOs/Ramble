import React, { useEffect } from 'react';
import useNumberField from '../../../../../hooks/useNumberField/useNumberField';
import { BookTypeDialogText as text } from '../DialogsText';

import Template from '../Template';
import ExperienceSummary from '../../ExperienceSummary/ExperienceSummary';
import Collapse from '@material-ui/core/Collapse';
import DialogContent from '@material-ui/core/DialogContent';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';

import { makeStyles } from '@material-ui/core/styles';
import styles from './BookTypeDialogStyles';
const useStyles = makeStyles(styles);

const BookTypeDialog = (props) => {
    const classes = useStyles();

    // Use my pretty +-
    const [numGuests, NumGuests] = useNumberField({
        min: 1,
        max: props.form.spotsLeft,
        initval: 1,
        step: 1,
        getlabel: (num) => num > 1? 'Guests' : 'Guest'
    });

    const privateEnabled = props.exp.price.private && 
                           (props.exp.capacity === props.form.spotsLeft);

    // For updating form values
    const {onChange} = props;
    const handleBookTypeChange = (type) => (e) => {
        onChange('bookType', type);
    }
    useEffect(() => {
        onChange('numGuests', numGuests);
    }, [onChange, numGuests]);
    // If private bookings are disabled, set option
    useEffect(() => {
        if(!privateEnabled) {
            onChange('bookType', 'public');
        }
    }, [privateEnabled, onChange]);


    const privateBooking = privateEnabled && 
        <button className={`${classes.bookButton} private
                            ${props.form.bookType === 'private' && 'selected'}`}
        onClick={handleBookTypeChange('private')}>
            <h3 className={classes.bookTitle}>{text.bookEntExp[props.lang]}</h3>
            <p>{text.beTheOnly[props.lang]}</p>
            <div className={classes.bookCapacity}>
                <FontAwesomeIcon icon={faUsers}/>
                <p>{`${text.upTo[props.lang][0]} ${props.exp.capacity} ${
                    text.upTo[props.lang][1]}`}</p>
            </div>
            <div className={classes.bookPrice}>
                $<span>{props.exp.price.private}</span>
            </div>
        </button>;

    const bookedSpots = props.exp.capacity - props.form.spotsLeft;

    return (
        <Template 
        open={props.open} 
        lang={props.lang}
        nextStep={props.controls.nextStep} 
        showContinue
        continueDisabled={(!props.form.bookType || !props.form.numGuests)}>
            <div className={classes.header}>
                <ChevronLeftIcon 
                onClick={props.controls.goBack} 
                className="goBackIcon"/>
                <h5 className="title">{text.completeBook[props.lang]}</h5>
            </div>
            <DialogContent>
                <div className={classes.expWrapper}>
                    <ExperienceSummary 
                    date={props.form.date} 
                    timeslot={props.form.timeslot} 
                    exp={props.exp}/>
                </div>
                {privateBooking}
                <Collapse in={props.form.bookType === 'private'} 
                className={`${classes.numGuests} private`}>
                    <p className="text">{text.numGuests[props.lang]}</p>
                    <div className="input">{NumGuests}</div>
                </Collapse>
                <button className={`${classes.bookButton}
                                    ${privateEnabled && 'private'}
                                    ${props.form.bookType === 'public' && 'selected'}`} 
                value="public" 
                onClick={handleBookTypeChange('public')}>
                    <h3 className={classes.bookTitle}>{text.bookPerPerson[props.lang]}</h3>
                        <p>{text.joinGuests[props.lang]}</p>
                        {bookedSpots > 0 &&
                        <div className={classes.bookCapacity}>
                            <FontAwesomeIcon icon={faUsers}/>
                            {props.lang === 'en' ?
                                <p>
                                    Join {bookedSpots} 
                                    {bookedSpots > 1? ' guests' : ' guest'}
                                </p> : 
                                <p>Joignez vous à d'autres invités</p>}
                        </div>}
                    <div className={classes.bookPrice}>
                        $<span>{props.exp.price.perPerson}</span>{text.perPerson[props.lang]}
                    </div>
                </button>
                <Collapse in={props.form.bookType === 'public'} 
                className={`${classes.numGuests} ${privateEnabled && 'private'}`}>
                    <p className="text">{text.numGuests[props.lang]}</p>
                    <div className="input">{NumGuests}</div>
                </Collapse>
            </DialogContent>
        </Template>
    );
}

export default BookTypeDialog;