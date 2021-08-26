import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { 
    useGetExperienceQuery, 
    useDecideExperienceMutation,
    Decision
} from 'graphql-api';

import Button from '@material-ui/core/Button';
import Experience from 'components/Experience/Experience';
import Spinner from 'components/Spinner/Spinner';

import { makeStyles } from '@material-ui/core/styles';
import styles from './ViewExperience.styles';
const useStyles = makeStyles(styles);

const ViewExperience = () => {
    const classes = useStyles();

    const [showEmailButton, setShowEmailButton] = useState(false);

    const { experienceId } = useParams<{ experienceId: string; }>();
    const { data } = useGetExperienceQuery({ variables: { id: experienceId } });
    const [decide, { loading }] = useDecideExperienceMutation({
        onCompleted: () => {
            setShowEmailButton(true);
        }
    });

    const handleDecision = (decision: Decision) => {
        decide({
            variables: { expId: experienceId, decision }
        });
    }

    return (
        <>
            {loading && <Spinner />}
            {data && <Experience experience={data.experience} />}
            <footer className={classes.footer}>
                {showEmailButton ?
                <Button variant="contained" href={`mailto:${data?.experience.creator.user.email}`}>
                    Email creator
                </Button> :
                <>
                    <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.approveButton}
                    onClick={() => handleDecision(Decision.Approved)}>
                        Approve
                    </Button>
                    <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={() => handleDecision(Decision.Rejected)}>
                        Reject
                    </Button>
                </>}
            </footer>
        </>
    );
}

export default ViewExperience;