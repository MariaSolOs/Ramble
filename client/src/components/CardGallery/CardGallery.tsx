import type { GetExperiencesByStatusQuery } from 'graphql-api';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import { makeStyles } from '@material-ui/core/styles';
import styles from './CardGallery.styles';
const useStyles = makeStyles(styles);

type Props = {
    title: string;
    experiences?: GetExperiencesByStatusQuery['experiencesByStatus'];
    onCardClick: (id: string) => void;
}

const CardGallery = (props: Props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h1>{props.title}</h1>
            <div className={classes.cards}>
                {props.experiences?.map(exp =>
                    <Card 
                    key={exp._id} 
                    className={classes.card} 
                    onClick={() => props.onCardClick(exp._id)}>
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

export default CardGallery;