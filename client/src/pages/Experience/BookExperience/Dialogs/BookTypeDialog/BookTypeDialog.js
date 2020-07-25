import React, {useEffect} from 'react';
import useNumberField from '../../../../../hooks/useNumberField';

//Components and icons
import Template from '../Template';
import ExperienceSummary from '../../ExperienceSummary';
import Collapse from '@material-ui/core/Collapse';
import DialogContent from '@material-ui/core/DialogContent';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUsers} from '@fortawesome/free-solid-svg-icons/faUsers';

import {makeStyles} from '@material-ui/core/styles';
import styles from './BookTypeDialogStyles';
const useStyles = makeStyles(styles);

const BookTypeDialog = (props) => {
    const classes = useStyles();

    //Use my pretty +-
    const [numGuests, NumGuests] = useNumberField({
        min: 1,
        max: props.form.spotsLeft,
        initval: 1,
        step: 1,
        getlabel: (num) => num > 1? 'Guests' : 'Guest'
    });

    //For updating form values
    const {onChange} = props;
    const handleBookTypeChange = (type) => (e) => {
        onChange('bookType', type);
    }
    useEffect(() => {
        onChange('numGuests', numGuests);
    }, [onChange, numGuests])

    const privateEnabled = props.exp.price.private && 
                          (props.exp.capacity === props.form.spotsLeft);

    const privateBooking = privateEnabled && 
        <button className={`${classes.bookButton} private
                            ${props.form.bookType === 'private' && 'selected'}`}
        onClick={handleBookTypeChange('private')}>
            <h3 className={classes.bookTitle}>Book entire experience</h3>
            <p>Be the only guest(s) at this experience</p>
            <div className={classes.bookCapacity}>
                <FontAwesomeIcon icon={faUsers}/>
                <p>Up to {props.exp.capacity} people</p>
            </div>
            <div className={classes.bookPrice}>
                $<span>{props.exp.price.private}</span>
            </div>
        </button>;

    return (
        <Template 
        open={props.open} 
        nextStep={props.controls.nextStep} 
        showContinue
        continueDisabled={(!props.form.bookType || !props.form.numGuests)}>
            <div className={classes.header}>
                <ChevronLeftIcon onClick={props.controls.goBack} 
                className="goBackIcon"/>
                <h5 className="title">Complete booking</h5>
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
                    <p className="text">Number of guests</p>
                    <div className="input">{NumGuests}</div>
                </Collapse>
                <button className={`${classes.bookButton}
                                    ${privateEnabled && 'private'}
                                    ${props.form.bookType === 'public' && 'selected'}`} 
                value="public" onClick={handleBookTypeChange('public')}>
                    <h3 className={classes.bookTitle}>Book per person</h3>
                    <p>Join other guests</p>
                    <div className={classes.bookCapacity}>
                        <FontAwesomeIcon icon={faUsers}/>
                        <p>
                            Join {props.form.spotsLeft} 
                            {props.form.spotsLeft > 1? ' guests' : ' guest'}
                        </p>
                    </div>
                    <div className={classes.bookPrice}>
                        $<span>{props.exp.price.perPerson}</span> per person
                    </div>
                </button>
                <Collapse in={props.form.bookType === 'public'} 
                className={`${classes.numGuests} ${privateEnabled && 'private'}`}>
                    <p className="text">Number of guests</p>
                    <div className="input">{NumGuests}</div>
                </Collapse>
            </DialogContent>
        </Template>
    );
}

export default BookTypeDialog;