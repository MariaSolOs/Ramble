import React, {useState} from 'react';
import axios from '../../../../../tokenizedAxios';

import InputBase from '@material-ui/core/InputBase';
import Checkbox from '../../../../../components/Input/Checkbox';

import {makeStyles} from '@material-ui/core/styles';
import styles from './PaymentDialogStyles';
const useStyles = makeStyles(styles);

const PromoCode = (props) => {
    //To show/hide the form
    const [hasCode, setHasCode] = useState(false);
    const handleFormToggle = (e) => {
        if(e.target.name === 'shower') {
            setHasCode(e.target.checked);
            props.onCanSubmit(false);
        } else { //e.target.name === 'hider'
            setHasCode(!e.target.checked);
            props.onCanSubmit(true);
        }
    }

    //Deal with the code value
    const [code, setCode] = useState('');
    const handleCodeChange = (e) => { setCode(e.target.value); }

    //Verify code with server
    const [codeErr, setCodeErr] = useState('');
    const handleCodeVerify = () => {
        if(props.userCode === code) {
            setCodeErr("You can't use your own code. Share it with a friend!");
            return;
        }
        axios.post('/api/stripe/promo', {code})
        .then(res => {
            if(res.data.valid) { 
                props.applyPromo(code); 
                props.onCanSubmit(true);
            } else { 
                props.onCanSubmit(false); 
                setCodeErr('The promo code is not valid.');
            }
        })
        .catch(err => {
            setCodeErr('The promo code is not valid.');
            props.onCanSubmit(false);
        });
    }

    const classes = useStyles({showPromoForm: hasCode});
    return (
        <div className={classes.codeForm}>
            {hasCode?
            <>
                <div className="code-input-row">
                    <InputBase
                    value={code}
                    onChange={handleCodeChange}
                    className={classes.input}/>
                    <button onClick={handleCodeVerify}>
                        Apply discount
                    </button>
                </div>
                {codeErr && 
                    <p className="code-err-msg">
                        {codeErr}
                    </p>}
                <div className={classes.checkboxField}>
                    <p className={classes.label}>
                       I don't have a discount code.
                    </p>
                <Checkbox 
                name="hider"
                onChange={handleFormToggle}/>
            </div>
            </> :
            <div className={classes.checkboxField}>
                <p className={classes.label}>
                    Do you have a promotion code?
                </p>
                <Checkbox 
                name="shower"
                onChange={handleFormToggle}/>
            </div>}
        </div>
    );
}

export default PromoCode;