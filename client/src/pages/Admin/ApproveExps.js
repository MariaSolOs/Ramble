import React, {useState, useEffect} from 'react';
import axios from '../../tokenizedAxios';
import {useDispatch} from 'react-redux';
import {showSnackbar} from '../../store/actions/ui';
import {useHistory} from 'react-router-dom';

import Gallery from '../../components/ExperiencesGallery';

//Styles
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    root: {
        marginTop: 100,
    },
    title: {
        marginLeft: 50,
        color: '#C5C5C5'
    }
}));


const ApproveExps = (props) => {
    const classes = useStyles();

    const [exps, setExps] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get('/api/exp/unapproved')
        .then(res => {
            setExps(res.data.exps);
        })
        .catch(err => {
            dispatch(showSnackbar(`FUUUUCKKKK ${err} 🤖`));
        });
    }, [dispatch]);

    const history = useHistory();
    const handleViewExp = (expId) => (e) => {
        history.push(`/admin/approveExp/${expId}`)
    }

    return (
        <div className={classes.root}>
            <h1 className={classes.title}>
                Click on an experience to review it.
            </h1>
            <Gallery
            experiences={exps}
            onCardClick={handleViewExp}/>
        </div>
    );
}

export default ApproveExps;

