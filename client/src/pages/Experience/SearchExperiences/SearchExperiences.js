import React, {useState, useEffect, useCallback} from 'react';
import {connect} from 'react-redux';
import {fetchExperiences} from '../../../store/actions/experiences';
import {saveExperience, unsaveExperience} from '../../../store/actions/user';
import {useHistory} from 'react-router-dom';

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

    //Update experiences with new queries
    const [displayExps, setDisplayExps] = useState([]);
    const {experiences} = props;
    useEffect(() => {
        setDisplayExps(experiences);
    }, [experiences]);

    //Handle searches
    const [title, setTitle] = useState('');
    const onQueryChange = (location, numPeople) => { 
        props.fetchExps(location, numPeople); 
    }
    const onTitleChange = (title) => { 
        setTitle(title);
    }
    useEffect(() => {
        //Wait 800ms after the user stops typing to update gallery
        const waitTimeout = setTimeout(() => {
            let matchingExps = experiences;
            if(title.length > 0) {
                setDisplayExps([]);
                matchingExps =  experiences.filter(exp => 
                    exp.title.toLowerCase().includes(title.toLowerCase())
                );
            }
            setDisplayExps(matchingExps);
        }, [800]);
        return () => clearTimeout(waitTimeout); 
    }, [title, experiences]);

    //For showing experience pages
    const history = useHistory();
    const handleViewExp = useCallback((expId) => (e) => {
        history.push(`/experience/${expId}`);
    }, [history]);

    //For saving/unsaving an experience
    const {savedExps, unsaveExp, saveExp} = props;
    const handleHeartClick = useCallback((expId) => (e) => {
        //Don't show the experience page
        e.stopPropagation();
        if(savedExps.includes(expId)) {
            unsaveExp(expId);
        } else {
            saveExp(expId);
        }
    }, [savedExps, saveExp, unsaveExp]);

    const checkIfSaved = useCallback((expId) => {
        return savedExps.includes(expId);
    }, [savedExps]);

    return (
        <div className={classes.root}>
            <div>
                <Searchbar 
                location={props.location}
                numPeople={props.numPeople}
                title={title}
                onQueryChange={onQueryChange}
                onTitleChange={onTitleChange}/>
            </div>
            <Gallery 
            experiences={displayExps}
            showHeart={props.isAuth} 
            onHeartClick={handleHeartClick}
            onCardClick={handleViewExp}
            checkIfSaved={checkIfSaved}/>
        </div>
    );
}

const mapStateToProps = (state) => ({
    location: state.exp.location,
    numPeople: state.exp.numPeople,
    experiences: state.exp.experiences,
    isAuth: (state.user.token !== null),
    savedExps: state.user.savedExps.map(exp => exp._id)
});
const mapDispatchToProps = (dispatch) => ({
    fetchExps: (loc, numPeople) => dispatch(fetchExperiences(loc, numPeople)),
    saveExp: (expId) => dispatch(saveExperience(expId)),
    unsaveExp: (expId) => dispatch(unsaveExperience(expId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchExperiences);