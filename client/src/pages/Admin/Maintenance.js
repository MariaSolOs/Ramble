import React, {useCallback} from 'react';
import axios from '../../tokenizedAxios';
import {useDispatch} from 'react-redux';
import {showSnackbar} from '../../store/actions/ui';

import Fab from '@material-ui/core/Fab';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';

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

    const dispatch = useDispatch();
    const handleDeleteRejectedExps = useCallback(() => {
        axios.delete('/api/exp/rejected')
        .then(res => {
            dispatch(showSnackbar(`You just deleted ${res.data.delCount}
            experience(s). 🚮`));
        })
        .catch(err => {
            dispatch(showSnackbar(`Ha... ${err} 🐲`));        
        });
    }, [dispatch]);

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
            </ul>
        </div>
    );
}

export default Maintenance;