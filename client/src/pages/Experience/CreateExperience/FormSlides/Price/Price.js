import React, {useState} from 'react';

//Components 
import Tip from '../../../../../components/Tip';
import TextField from '../../../../../components/Input/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

//Styles 
import {makeStyles} from '@material-ui/core/styles';
import styles from './PriceStyles';
const useStyles = makeStyles(styles);

const Price = ({price, privatePrice, currency, capacity, submitInput}) => {
    const classes = useStyles();

    //For handling changes
    const handlePriceChange = (type) => (e) => {
        const price = e.target.value.slice(2);
        //No decimal values allowed
        if(/^\d+$/.test(price) || price === '') {
            submitInput(type, e.target.value.slice(2));
        }
    }
    const handleCurrencyChange = (e) => {
        submitInput('currency', e.target.value);
    }

    //For showing/hiding booking section
    const [showBookings, setShowBookings] = useState(false);
    const handleToggleBookings = (e) => {
        setShowBookings(e.target.checked);
    }

    return (
        <>
            <div>
                <h1 className={classes.title}>Pricing</h1>
                <p className={`${classes.description} header`}>
                    Enter the price each guest should pay.
                </p>
                <Tip>This price will be displayed as "Per person"</Tip>
                <div className={classes.inputRow}>
                    <div className={classes.field}>
                        <p className={classes.description}>Price per person</p>
                        <div className={classes.input}>
                            <TextField
                            onChange={handlePriceChange('price')}
                            value={`$ ${price}`}/>
                        </div>
                    </div>
                    <div className={classes.field}>
                        <p className={classes.description}>Currency</p>
                        <div className={classes.input}>
                            <TextField 
                            select 
                            value={currency}
                            onChange={handleCurrencyChange}
                            SelectProps={{
                                MenuProps: {
                                    classes: { paper: classes.select_menu },
                                    getContentAnchorEl: null,
                                    anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'right'
                                    }
                                },
                                IconComponent: KeyboardArrowDownIcon
                            }}>
                                <MenuItem value='CAD'>$ CAD</MenuItem>
                                <MenuItem value='USD'>$ USD</MenuItem>
                            </TextField>
                        </div>
                    </div>
                    <div className="num-guests">
                        <p className={classes.description}>
                            X {capacity} {capacity > 1? 'Guests' : 'Guest'} =
                        </p>
                    </div>
                    <div className={classes.field}>
                        <p className={classes.description}>Projected revenue</p>
                        <div className={classes.input}>
                            <TextField
                            readOnly
                            value={`$ ${capacity * price}`}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.bookingField}>
            <Switch 
            color="default" 
            onChange={handleToggleBookings}
            className={classes.toggle}/>
                <h3 className={classes.bookingTitle}>Enable private bookings</h3>
                <p className={classes.description}>
                    Charge a special price for people who want to be the only guests at your experience.
                </p>
                <div hidden={!showBookings}>
                    <Tip className={classes.tip}>
                        This is a fixed price private groups have to pay to book the entire experience.
                    </Tip>
                    <Tip className={classes.tip}>
                        This option will be offered to your guests if all spots are available for a time slot.
                    </Tip>
                    <div className={classes.inputRow}>
                        <div className={classes.field}>
                            <p className={classes.description}>Price for private bookings</p>
                            <div className={classes.input}>
                                <TextField
                                onChange={handlePriceChange('privatePrice')}
                                value={`$ ${privatePrice}`}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Price;