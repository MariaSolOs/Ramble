import React, {useCallback} from 'react';
import axios from '../../../tokenizedAxios';

import Fab from '@material-ui/core/Fab';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import EventBusyIcon from '@material-ui/icons/EventBusy';

//Styles
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    root: { 
        marginTop: 100,
        fontWeight: 'bold',
        letterSpacing: '-0.05rem'
    },
    title: {
        color: '#FFF',
        textAlign: 'center',
    },
    actions: {
        listStyle: 'none',
        color: '#C5C5C5',
        width: '50%',
        minWidth: 300,
        margin: '0 auto',
        '& li': {
            display: 'flex',
            alignItems: 'center',
            margin: '5px 0',

            '& .MuiFab-root': {
                float: 'left',
                marginRight: '1rem'
            }
        }
    }
}));

const Maintenance = (props) => {
    const classes = useStyles();

    const {showSnackbar} = props;
    const handleDeleteRejectedExps = useCallback(() => {
        axios.delete('/api/exp/rejected')
        .then(res => {
            showSnackbar(`You just deleted ${res.data.delCount}
            experience(s). 🚮`)
        })
        .catch(err => {
            showSnackbar(`Ha... ${err} 🐲`)            
        });
    }, [showSnackbar]);
    const handleDeletePastOccs = useCallback(() => {
        axios.delete('/api/exp/rejected')
        .then(res => {
            showSnackbar(`You just deleted ${res.data.delCount}
            experiences. 🚮`)
        })
        .catch(err => {
            showSnackbar(`Ha... ${err} 🐲`)            
        });
    }, [showSnackbar]);

    return (
        <div className={classes.root}>
            <h1 className={classes.title}>What do you want to do?</h1>
            <ul className={classes.actions}>
                <li>
                    <Fab onClick={handleDeleteRejectedExps}>
                        <DeleteSweepIcon/>
                    </Fab>
                    Delete all rejected experiences
                </li>
                {/* <li>
                    <Fab onClick={handleDeletePastOccs}>
                        <EventBusyIcon/>
                    </Fab>
                    Delete all past occurrences (and respective bookings)
                </li> */}
            </ul>
        </div>
    );
}

export default Maintenance;