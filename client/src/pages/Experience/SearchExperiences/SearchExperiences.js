import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import useSearchReducer from './store/reducer';
import * as actions from './store/actionTypes';
import {connect} from 'react-redux';
import {saveExperience, unsaveExperience} from '../../../store/actions/user';
import {useHistory, useLocation} from 'react-router-dom';
import withErrorDialog from '../../../hoc/withErrorDialog/withErrorDialog';

//Components
import Searchbar from './Searchbar/Searchbar';
import Gallery from '../../../components/ExperiencesGallery';

//Styles
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: '100vw',
        minHeight: '85vh',
        margin: '15vh 0 0',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
    }
}));

const SearchExperiences = (props) => {
    const classes = useStyles();
    const [state, dispatch] = useSearchReducer();

    const {displayError} = props;
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
            displayError('We cannot find the experiences you searched for.');
        });
    }, [dispatch, displayError]);

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
        history.push(`/experience/${expId}`);
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
    isAuth: (state.user.token !== null),
    savedExps: state.user.savedExps.map(exp => exp._id)
});
const mapDispatchToProps = (dispatch) => ({
    saveExp: (expId) => dispatch(saveExperience(expId)),
    unsaveExp: (expId) => dispatch(unsaveExperience(expId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorDialog(SearchExperiences));