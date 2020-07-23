import React, {useContext} from 'react';
import {CloudinaryContext} from '../context/cloudinaryContext';

//MUI
import StarRateIcon from '@material-ui/icons/StarRate';

//Styles
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        cursor: 'default',
        flexShrink: 0,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        '& img': {
            width: '100%',
            height: '62%',
            objectFit: 'cover'
        }
    },

    //Card content
    body: {
        backgroundColor: '#2D2E2E',
        fontFamily: 'Helvetica, sans-serif',
        letterSpacing: '-0.02rem',
        color: '#ECEBE5',
        height: '38%',
        minHeight: 100,
        marginTop: -5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 10px 10px',
        boxSizing: 'border-box',
    },
    title: {
        fontWeight: 'bold',
        fontSize: '0.9rem',
        margin: '5px auto 4px 0',
        textAlign: 'left',
        overflowWrap: 'break-word'
    },
    location: {
        margin: '0 auto 7px 0',
        fontSize: '0.8rem',
    },
    rating: {
        margin: 0,
        fontSize: '0.75rem',
        fontWeight: 'bold',
        display: 'inline-flex',
        alignItems: 'center',
        '& svg': { 
            width: '1rem',
            height: '1rem',
            marginLeft: 5
        }
    },
    price: {
        alignSelf: 'flex-end',
        fontSize: '0.7rem',
        margin: '-10px 0 0',
        fontWeight: 'bold',
        '& span': {
            fontSize: '1.1rem',
            letterSpacing: '-0.02rem'
        }
    }
}));

/**
 * Displays a single experience card
 * @param {Object} exp - Experience to display
 */
const ExperienceCard = (props) => {
    const classes = useStyles();
    const cloudinary = useContext(CloudinaryContext);

    return (
        <div className={classes.root}>
            <img src={cloudinary.url(props.exp.images[0], 
            {height: 400, dpr: 'auto', quality: 'auto', crop: 'fill', secure: true})}
            alt={`Experience - ${props.exp.title}`}/>
            <div className={classes.body}>
                <p className={classes.title}>{props.exp.title}</p>
                <p className={classes.location}>{props.exp.location.displayLocation}</p>
                <p className={classes.rating}>{props.exp.rating}<StarRateIcon/></p>
                <p className={classes.price}>
                    <span>${props.exp.price.perPerson}</span> PER PERSON
                </p>
            </div>
        </div>
    );
}

export default React.memo(ExperienceCard);