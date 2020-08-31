import React, {useCallback} from 'react';
import axios from '../../../tokenizedAxios';
import {useDispatch} from 'react-redux';
import {showSnackbar} from '../../../store/actions/ui';

import Fab from '@material-ui/core/Fab';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';

import {makeStyles} from '@material-ui/core/styles';
import styles from './MaintenanceStyles';
const useStyles = makeStyles(styles);

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