import React from 'react';
import { useHistory } from 'react-router-dom';

import NavRow from '../NavRow/NavRow';
import ExperienceCard from '../../../../components/ExperienceCard/ExperienceCard';

import { makeStyles } from '@material-ui/core/styles';
import styles from './CreatedExperiencesStyles';
const useStyles = makeStyles(styles);

const CreatedExperiences = ({ exps, onEditExp }) => {
    const classes = useStyles();

    const history = useHistory();

    const handleClick = (exp) => () => {
        onEditExp(exp);
        history.push('/creator/dashboard/edit-exp');
    }

    return (
        <div className={classes.root}>
            <div className={classes.shadowSeparator}/>
            <div className={classes.page}>
                <NavRow/>
                <div className={classes.experiences}>
                    {exps.map(exp => (
                        <ExperienceCard
                        key={exp._id}
                        exp={exp}
                        onCardClick={handleClick(exp)}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CreatedExperiences;