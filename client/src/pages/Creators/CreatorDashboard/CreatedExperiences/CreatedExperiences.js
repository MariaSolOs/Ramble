import React from 'react';
import { useHistory } from 'react-router-dom';

import ExperienceCard from '../../../../components/ExperienceCard/ExperienceCard';
import NoCreatedExps from '../NoCreatedExps/NoCreatedExps';

import { makeStyles } from '@material-ui/core/styles';
import styles from './CreatedExperiencesStyles';
const useStyles = makeStyles(styles);

const CreatedExperiences = ({ exps, onEditExp }) => {
    const classes = useStyles();

    const history = useHistory();

    const handleClick = (exp) => () => {
        onEditExp(exp);
        history.push('/creator/dashboard/edit-exp/planning');
    }

    return (exps.length === 0? <NoCreatedExps/> :
        <div className={classes.experiences}>
            {exps.map(exp => (
                <ExperienceCard
                key={exp._id}
                exp={exp}
                onCardClick={handleClick(exp)}/>
            ))}
        </div>
    );
}

export default CreatedExperiences;