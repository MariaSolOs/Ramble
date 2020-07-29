import React from 'react';
import {connect} from 'react-redux';

//Components
import Navbar from './Navbar';

//Styles
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        minHeight: '70vh',
        width: '90%',
        margin: '15vh auto 0'
    },

    body: {
        display: 'flex',
        width: '100%', 
        justifyContent: 'space-between',
        position: 'relative',
    },
    page: {
        width: '80%'
    },

    //Header with avatar
    header: {
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
        '& img': {
            width: '8rem',
            height: '8rem',
            borderRadius: '50%'
        }
    },

    userHeader: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '2.5rem',
        letterSpacing: '-0.06rem',
        fontFamily: 'Helvetica, sans-serif',
        '& h1': {
            fontWeight: 'bold',
            fontSize: '2.2rem',
            color: '#E6E6E6',
            margin: 0
        },
        '& p': {
            color: '#ACACAC',
            fontSize: '1.3rem',
            margin: 0
        }
    },

    //Shadow divider
    shadowSeparator: {
        padding: 6,
        borderRadius: 10,
        margin: '0 3% 100px 0',
        background: 'linear-gradient(to bottom, #1A1A1A, #5B5B5B)'
    },

    navbar: {
        width: '25%',
        minWidth: 190
    }
}));

const Layout = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <img src={props.photo} alt="User avatar"/>
                <div className={classes.userHeader}>
                    <h1>{props.fstName}</h1>
                    <p>{props.city}</p>
                </div>
            </div>
            <div className={classes.body}>   
                <div className={classes.navbar}>
                    <Navbar/>
                </div>
                <div className={classes.shadowSeparator}/>
                <div className={classes.page}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    fstName: state.user.userData.fstName,
    photo: state.user.userData.photo,
    city: state.user.userData.city
});

export default connect(mapStateToProps, null)(Layout);