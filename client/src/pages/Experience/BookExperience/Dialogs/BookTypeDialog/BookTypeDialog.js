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

const BookTypeDialog = ({open, form, exp, onChange, controls}) => {
    const classes = useStyles();

    //Use my pretty +-
    const [numGuests, NumGuests] = useNumberField({
        min: 1,
        max: form.spotsLeft,
        initval: 1,
        step: 1,
        getlabel: (num) => num > 1? 'Guests' : 'Guest'
    });

    //For updating form values
    const handleBookTypeChange = (type) => (e) => {
        onChange('bookType', type);
    }
    useEffect(() => {
        onChange('numGuests', numGuests);
    }, [onChange, numGuests])

    const privateEnabled = exp.price.private && 
                          (exp.capacity === form.spotsLeft);

    const privateBooking = privateEnabled && 
        <button className={`${classes.bookButton} private
                            ${form.bookType === 'private' && 'selected'}`}
        onClick={handleBookTypeChange('private')}>
            <h3 className={classes.bookTitle}>Book entire experience</h3>
            <p>Be the only guest(s) at this experience</p>
            <div className={classes.bookCapacity}>
                <FontAwesomeIcon icon={faUsers}/>
                <p>Up to {exp.capacity} people</p>
            </div>
            <div className={classes.bookPrice}>
                $<span>{exp.price.private}</span>
            </div>
        </button>;

    return (
        <Template 
        open={open} 
        controls={controls} 
        continueDisabled={(!form.bookType || !form.numGuests)}>
            <div className={classes.header}>
                <ChevronLeftIcon onClick={controls.goBack} className="goBackIcon"/>
                <h5 className="title">Complete booking</h5>
            </div>
            <DialogContent>
                <div className={classes.expWrapper}>
                    <ExperienceSummary 
                    date={form.date} 
                    timeslot={form.timeslot} 
                    exp={exp}/>
                </div>
                {privateBooking}
                <Collapse in={form.bookType === 'private'} 
                className={`${classes.numGuests} private`}>
                    <p className="text">Number of guests</p>
                    <div className="input">{NumGuests}</div>
                </Collapse>
                <button className={`${classes.bookButton}
                                    ${privateEnabled && 'private'}
                                    ${form.bookType === 'public' && 'selected'}`} 
                value="public" onClick={handleBookTypeChange('public')}>
                    <h3 className={classes.bookTitle}>Book per person</h3>
                    <p>Join other guests</p>
                    <div className={classes.bookCapacity}>
                        <FontAwesomeIcon icon={faUsers}/>
                        <p>
                            Join {form.spotsLeft} 
                            {form.spotsLeft > 1? ' guests' : ' guest'}
                        </p>
                    </div>
                    <div className={classes.bookPrice}>
                        $<span>{exp.price.perPerson}</span> per person
                    </div>
                </button>
                <Collapse in={form.bookType === 'public'} 
                className={`${classes.numGuests} ${privateEnabled && 'private'}`}>
                    <p className="text">Number of guests</p>
                    <div className="input">{NumGuests}</div>
                </Collapse>
            </DialogContent>
        </Template>
    );
}

export default BookTypeDialog;