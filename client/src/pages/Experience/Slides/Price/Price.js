import React, { useState } from 'react';
import { PriceText as text } from '../SlidesText';

import Tip from '../../../../components/Tip/Tip';
import TextField from '../../../../components/Input/TextField/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import { makeStyles } from '@material-ui/core/styles';
import styles from './PriceStyles';
const useStyles = makeStyles(styles);

const Price = ({ price, privatePrice, currency, capacity, submitInput, lang }) => {
    const classes = useStyles();

    // For handling changes
    const handlePriceChange = (type) => (e) => {
        const price = e.target.value.slice(2);
        // No decimal values allowed
        if (/^\d+$/.test(price) || price === '') {
            submitInput(type, e.target.value.slice(2));
        }
    }
    const handleCurrencyChange = (e) => {
        submitInput('currency', e.target.value);
    }

    // For showing/hiding booking section
    const [showBookings, setShowBookings] = useState(false);
    const handleToggleBookings = (e) => {
        setShowBookings(e.target.checked);
    }

    return (
        <>
            <div>
                <h1 className={classes.title}>{text.title[lang]}</h1>
                <p className={`${classes.description} header`}>
                    {text.enterPrice[lang]}
                </p>
                <Tip>{text.tip1[lang]}</Tip>
                <div className={classes.inputRow}>
                    <div className={classes.field}>
                        <p className={classes.description}>
                            {text.pricePerPers[lang]}
                        </p>
                        <div className={classes.input}>
                            <TextField
                            onChange={handlePriceChange('price')}
                            value={`$ ${price}`}/>
                        </div>
                    </div>
                    <div className={classes.field}>
                        <p className={classes.description}>
                            {text.currency[lang]}
                        </p>
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
                            X {capacity} {capacity > 1 ? 
                                text.guests[lang] : text.guest[lang]} =
                        </p>
                    </div>
                    <div className={classes.field}>
                        <p className={classes.description}>{text.projRev[lang]}</p>
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
                <h3 className={classes.bookingTitle}>{text.enablePriv[lang]}</h3>
                <p className={classes.description}>{text.descPriv[lang]}</p>
                <div hidden={!showBookings}>
                    <Tip className={classes.tip}>{text.tip2[lang]}</Tip>
                    <Tip className={classes.tip}>{text.tip3[lang]}</Tip>
                    <div className={classes.inputRow}>
                        <div className={classes.field}>
                            <p className={classes.description}>{text.privPrice[lang]}</p>
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