import React, {useState, useEffect} from 'react';
import uuid from 'react-uuid';
import useSavedCards from '../../../../hooks/useSavedCards';
import {useLocation, Link} from 'react-router-dom';

import CustomScroll from 'react-custom-scroll';
import Avatar from '@material-ui/core/Avatar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUsers} from '@fortawesome/free-solid-svg-icons/faUsers';
import {faPhoneAlt} from '@fortawesome/free-solid-svg-icons/faPhoneAlt';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt';

import 'react-custom-scroll/dist/customScroll.css';
import {makeStyles} from '@material-ui/core/styles';
import styles from './BookingSubmittedStyles';
const useStyles = makeStyles(styles);

const BookingSubmitted = (props) => {
    const classes = useStyles();

    //Change background color
    useEffect(() => {
        document.body.style = 'background-color: #1C1C1C';
        return () => document.body.style = 'background-color: #151515';
    }, []);

    //Get booking info from state
    const {state} = useLocation();
    const {exp, occ, booking} = state;

    //Format occurrence date
    const format = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const occDate = new Date(occ.date).toLocaleDateString('en-US', format);

    //Depending on the payment method, set card info
    const {cards, getCardBrandIcon} = useSavedCards();
    const [cardInfo, setCardInfo] = useState({
        brand: '',
        last4: '',
        icon: null
    });
    useEffect(() => {
        if(booking.payInfo.savedCardUsed) {
            const cardUsed = cards.filter(card => 
                card.id === booking.payInfo.savedCardUsed
            )[0];
            setCardInfo({...cardUsed});
        } else {
            setCardInfo({
                ...booking.payInfo.cardInfo,
                icon: getCardBrandIcon(booking.payInfo.cardInfo.brand)
            });
        }
    }, [cards, getCardBrandIcon, booking.payInfo]);

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <div className="header-gradient"/>
                <div>
                    <h1 className={classes.white}>Your booking request was sent</h1>
                    <h2 className={classes.grey}>
                        We'll let you know as soon as {exp.creator.name} approves 
                        your request
                    </h2>
                </div>
            </div>
            <div className={classes.body}>
                <img 
                src={exp.img} 
                alt="Experience preview"
                className="exp-img"/>
                <div className={classes.description}>
                    <CustomScroll heightRelativeToParent="100%">
                        <h1 className={classes.white}>{exp.title}</h1>
                        <div className={classes.bookDetails}>
                            <h4 className={classes.grey}>{occDate}</h4>
                            <h4 className={classes.grey}>{occ.timeslot}</h4>
                            <div className="num-guests">
                                <FontAwesomeIcon icon={faUsers}/>
                                <h4 className={classes.grey}>
                                    {booking.numGuests} 
                                    {booking.numGuests > 1? ' Guests' : ' Guest'}
                                </h4>
                            </div>
                        </div>
                        <h2 className={classes.grey}>Your host</h2>
                        <div className={classes.host}>
                            <Avatar src={exp.creator.img}/>
                            <p className={classes.grey}>{exp.creator.name}</p>
                            <FontAwesomeIcon icon={faPhoneAlt}/>
                            <p className={classes.grey}>{exp.creator.phoneNumber}</p>
                        </div>
                        {exp.toBring.length > 0 &&
                        <>
                            <h2 className={classes.grey}>Be sure to bring</h2>
                            <ul className={classes.toBring}>
                                {exp.toBring.map(item => (
                                    <li 
                                    key={uuid()}
                                    className={classes.grey}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </>}
                        <h2 className={classes.grey}>
                            Meeting spot
                        </h2>
                        <div className={classes.meetPoint}>
                            <FontAwesomeIcon icon={faMapMarkerAlt}/>
                            <p className={classes.grey}>
                                {exp.meetPoint}
                            </p>
                        </div>
                        <h2 className={classes.grey}>Payment details</h2>
                        <div className={classes.payDetails}>
                            <p className="pay-method">PAYMENT METHOD</p>
                            <div className={classes.cardInfo}>
                                {cardInfo.icon}
                                <span className="bullets">
                                &bull;&bull;&bull;&bull; 
                                &bull;&bull;&bull;&bull; 
                                &bull;&bull;&bull;&bull;
                                </span>
                                {cardInfo.last4}
                            </div>
                           {booking.bookType === 'public' &&
                            <div className={`${classes.calculation} row`}>
                                <p>
                                    {booking.numGuests}<span> x $</span>
                                    {exp.price.perPerson.toFixed(2)}
                                </p>
                                <p>
                                    ${(booking.numGuests * exp.price.perPerson)
                                      .toFixed(2)}
                                </p>
                            </div>}
                            <div className={`${classes.total} row`}>
                                <p>
                                    Total <span> ({exp.price.currency})</span>
                                </p>
                                <p>
                                    ${booking.bookType === 'public'?
                                    (booking.numGuests * exp.price.perPerson)
                                    .toFixed(2) : exp.price.private}
                                </p>
                            </div>
                        </div>
                    </CustomScroll>
                </div>
            </div>
            <div className={classes.footer}>
                <Link to="/">
                    <button>Got it</button>
                </Link>
            </div>
        </div>
    );
}

export default BookingSubmitted;