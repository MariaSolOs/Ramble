import { useHistory } from 'react-router-dom';

import { useGetPendingExperiencesQuery } from 'graphql-api';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Spinner from 'components/Spinner/Spinner';

import { makeStyles } from '@material-ui/core/styles';
import styles from './ApprovalGallery.styles';
const useStyles = makeStyles(styles);

const ApprovalGallery = () => {
    const history = useHistory();
    const classes = useStyles();

    const { data, loading } = useGetPendingExperiencesQuery();

    if (!data || loading) {
        return <Spinner />;
    }

    return (
        <div className={classes.root}>
            <h1>Unapproved Experiences</h1>
            <div className={classes.cards}>
                {data.unapprovedExperiences.map(exp =>
                    <Card 
                    key={exp._id} 
                    className={classes.card} 
                    onClick={() => history.push(`/view/${exp._id}`)}>
                        <CardMedia
                        image={exp.images[0]}
                        title={exp.title}
                        className={classes.cardMedia} />
                        <CardContent>
                            <h3>{exp.title}</h3>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}

export default ApprovalGallery;