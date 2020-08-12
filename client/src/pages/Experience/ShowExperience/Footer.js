import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    footer: {
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        padding: '0.65rem 2rem',
        display: 'flex',
        height: 'auto',
        maxHeight: 60,
        zIndex: 5,
        fontFamily: 'Helvetica, sans-serif',
        backgroundColor: '#1C1C1C', 
        '& > div': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: 'calc(100vw - 24% - 45%)',
            margin: '0 15% 0 auto',
            [theme.breakpoints.down('sm')]: { 
                width: '80%',
                margin: '0 auto',
                justifyContent: 'space-around'
            }
        }
    },

    price: {
        margin: 0,
        color: '#BFBFBF',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        letterSpacing: '-0.03rem',
        '& span': {
            color: '#FFF',
            fontSize: '1.5rem',
            display: 'inline-block',
            margin: '0 3px',
            '&:first-letter': { fontSize: '1rem' }
        }
    },
    
    bookButton: {
        height: '3rem',
        width: '8.5rem',
        borderRadius: '0.5rem',
        color: '#ECEBE5',
        background: 'linear-gradient(to right, #2BB282 0%, #2D73EA 50%, #2BB282 90%)',
        fontSize: '1rem',
        padding: '0 10px',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
        lineHeight: 0.92,
        border: 'none',
        cursor: 'pointer',
        backgroundSize: '200% auto',
        transition: 'all 300ms ease-in-out',
        '&:focus': { outline: 'none' },
        '&:hover': { backgroundPosition: 'right center' }
    }
}));

const Footer = ({price, onBooking}) => {
    const classes = useStyles();
    return (
        <div className={classes.footer}>
            <div>
                <p className={classes.price}><span>${price}</span>PER PERSON</p>
                <button className={classes.bookButton} onClick={onBooking}>
                    Book experience
                </button>
            </div>
        </div>
    );
}

export default React.memo(Footer);