import React, {useState, useEffect, useCallback} from 'react';
import axios from '../../../tokenizedAxios';
import useSearchReducer from './store/reducer';
import * as actions from './store/actionTypes';
import {connect} from 'react-redux';
import {saveExperience, unsaveExperience} from '../../../store/actions/experiences';
import {showError} from '../../../store/actions/ui';
import {useHistory, useLocation} from 'react-router-dom';

import Searchbar from './Searchbar/Searchbar';
import Gallery from '../../../components/ExperiencesGallery/ExperiencesGallery';

import {makeStyles} from '@material-ui/core/styles';
import styles from './SearchExperiencesStyles';
const useStyles = makeStyles(styles);

const SearchExperiences = (props) => {
    const classes = useStyles();
    const [state, dispatch] = useSearchReducer();

    const {showError} = props;
    const fetchExperiences = useCallback((location, numPeople) => {
        dispatch({type: actions.SET_QUERY, location, numPeople});
        axios.get('/api/exp', { params: { location, numPeople }})
        .then(res => {
            if(res.status === 200) {
                dispatch({
                    type: actions.SET_EXPERIENCES, 
                    experiences: res.data.exps
                });
            }
        }).catch(err => {
            showError('We cannot find the experience you searched for.');
        });
    }, [dispatch, showError]);

    //Get query from URL and do initial search
    const query = new URLSearchParams(useLocation().search);
    const location = query.get('location');
    const numPeople = query.get('numPeople');
    useEffect(() => {
        if(location && numPeople) {
            fetchExperiences(location, numPeople);
        }
    }, [fetchExperiences, location, numPeople]);

    const {experiences} = state;
    //Handle title filtering
    const [title, setTitle] = useState('');
    const onTitleChange = (title) => { setTitle(title); }
    useEffect(() => {
        //Wait 800ms after the user stops typing to update gallery
        const waitTimeout = setTimeout(() => {
            let matchingExps = experiences;
            if(title.length > 0) {
                dispatch({type: actions.SET_EXPS_BY_TITLE, experiences: []});
                matchingExps =  experiences.filter(exp => 
                    exp.title.toLowerCase().includes(title.toLowerCase())
                );
            }
            dispatch({type: actions.SET_EXPS_BY_TITLE, experiences: matchingExps});
        }, [800]);
        return () => clearTimeout(waitTimeout); 
    }, [title, experiences, dispatch]);

    const history = useHistory();
    //For showing experience pages
    const handleViewExp = useCallback((expId) => (e) => {
        history.push(`/experience/view/${expId}`);
    }, [history]);

    //For handling new queries
    const handleNewQuery = useCallback((location, numPeople) => {
        history.push(`/experience/search?location=${location}&numPeople=${numPeople}`);
    }, [history]);

    //For saving/unsaving an experience
    const {savedExps, unsaveExp, saveExp} = props;
    const handleHeartClick = useCallback((expId) => (e) => {
        //Don't show the experience page
        e.stopPropagation();
        if(savedExps.includes(expId)) { unsaveExp(expId); } 
        else { saveExp(expId); }
    }, [savedExps, saveExp, unsaveExp]);

    const checkIfSaved = useCallback((expId) => {
        return savedExps.includes(expId);
    }, [savedExps]);

    return (
        <div className={classes.root}>
            <div>
                <Searchbar 
                location={location}
                numPeople={numPeople}
                title={title}
                onQueryChange={handleNewQuery}
                onTitleChange={onTitleChange}/>
            </div>
            <Gallery 
            experiences={state.expsByTitle}
            showHeart={props.isAuth} 
            onHeartClick={handleHeartClick}
            onCardClick={handleViewExp}
            checkIfSaved={checkIfSaved}/>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuth: state.user.profile.id !== null,
    savedExps: state.exp.savedExps.map(exp => exp._id)
});
const mapDispatchToProps = (dispatch) => ({
    saveExp: (expId) => dispatch(saveExperience(expId)),
    unsaveExp: (expId) => dispatch(unsaveExperience(expId)),
    showError: (msg) => dispatch(showError(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchExperiences);