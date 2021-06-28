import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import { useLanguageContext } from 'context/languageContext';
import type { CompletableSlide } from 'models/prop-interfaces';
import type { Currency } from 'models/experience';
import { CURRENCIES } from 'models/experience';

import Title from 'components/ExperienceBuilderTitle/ExperienceBuilderTitle';
import Subtitle from 'components/ExperienceBuilderSubtitle/ExperienceBuilderSubtitle';
import Tip from 'components/Tip/Tip';
import TextField from 'components/TextField/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Switch from '@material-ui/core/Switch';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Pricing.styles';
const useStyles = makeStyles(styles);

interface Props extends CompletableSlide {
    pricePerPerson: number;
    privatePrice: number;
    currency: Currency;
    capacity: number;
    onPricePerPersonChange: (price: number) => void;
    onPrivatePriceChange: (price: number) => void;
    onCurrencyChange: (currency: Currency) => void;
}

const PRICE_REGEX = /^\d+$/;

const Pricing = (props: Props) => {
    const { BuilderSlides_Pricing: text } = useLanguageContext().appText;
    const classes = useStyles();

    const { onSlideComplete, pricePerPerson, privatePrice } = props;
    const [isPrivateEnabled, setIsPrivateEnabled] = useState(privatePrice > 0);

    useEffect(() => {
        /* Continue when the public price is defined, and if a private
           price was selected, make sure it is also valid. */ 
        onSlideComplete(
            pricePerPerson > 0 &&
            (!isPrivateEnabled || privatePrice > 0)
        );
    }, [onSlideComplete, pricePerPerson, privatePrice, isPrivateEnabled]);

    const handlePricePerPersonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Remove the dollar sign
        const price = event.target.value.slice(2);
        if (price === '' || PRICE_REGEX.test(price)) {
            props.onPricePerPersonChange(+price);
        }
    }

    const handlePrivatePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Remove the dollar sign
        const price = event.target.value.slice(2);
        if (price === '' || PRICE_REGEX.test(price)) {
            props.onPrivatePriceChange(+price);
        }
    }

    return (
        <>
            <Title>{text.title}</Title>
            <Subtitle>{text.subtitle1}</Subtitle>
            <Tip>{text.tip1}</Tip>
            <div className={classes.priceRow}>
                <div className={classes.fieldContainer}>
                    <label className={classes.greyText}>
                        {text.pricePerPerson}
                    </label>
                    <TextField
                    required
                    value={`$ ${pricePerPerson}`}
                    onChange={handlePricePerPersonChange}
                    className={classes.textfield} />
                </div>
                <div className={classes.fieldContainer}>
                    <label className={classes.greyText}>
                        {text.currency}
                    </label>
                    <TextField
                    required
                    select
                    value={props.currency}
                    onChange={e => props.onCurrencyChange(e.target.value)}
                    SelectProps={{
                        MenuProps: {
                            classes: { paper: classes.selectMenu },
                            getContentAnchorEl: null,
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left'
                            }
                        },
                        IconComponent: KeyboardArrowDownIcon
                    }}
                    className={classes.textfield}>
                        {CURRENCIES.map(currency => 
                            <MenuItem key={uuid()} value={currency}>
                                $ {currency}
                            </MenuItem>
                        )}
                    </TextField>
                </div>
                <div className={`${classes.fieldContainer} ${classes.multiplication}`}>
                    <p className={classes.greyText}>
                        X {props.capacity} {props.capacity > 1 ? 
                        text.guests : text.guest} =
                    </p>
                </div>
                <div className={classes.fieldContainer}>
                    <label className={classes.greyText}>
                        {text.revenue}
                    </label>
                    <TextField
                    disabled
                    value={`$ ${pricePerPerson * props.capacity}`}
                    className={classes.textfield} />
                </div>
            </div>
            <div className={classes.privatePriceHeader}>
                <Subtitle>{text.subtitle2}</Subtitle>
                <p className={classes.greyText}>{text.privatePriceDescription}</p>
                <Switch 
                size="small" 
                color="default" 
                className={classes.switch}
                onChange={(_, checked) => setIsPrivateEnabled(checked)} />
            </div>
            {isPrivateEnabled &&
                <div className={classes.privatePriceContainer}>
                    <Tip>{text.tip2}</Tip>
                    <Tip>{text.tip3}</Tip>
                    <div className={classes.fieldContainer}>
                        <label className={classes.greyText}>
                            {text.privatePrice}
                        </label>
                        <TextField
                        value={`$ ${privatePrice}`}
                        onChange={handlePrivatePriceChange}
                        className={classes.textfield} />
                    </div>
                </div>}
        </>
    );
}

export default Pricing;