import { useState } from 'react';

import { 
    useGetUnapprovedReviewsQuery,
    useDecideReviewMutation,
    Decision
} from 'graphql-api';
import type { GetUnapprovedReviewsQuery } from 'graphql-api';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';

import { makeStyles } from '@material-ui/core/styles';
import styles from './ReviewsGallery.styles';
const useStyles = makeStyles(styles);

const ReviewsGallery = () => {
    const classes = useStyles();

    const [reviews, setReviews] = useState<GetUnapprovedReviewsQuery['unapprovedReviews']>([]);
    useGetUnapprovedReviewsQuery({
        onCompleted: ({ unapprovedReviews }) => setReviews(unapprovedReviews)
    });
    const [decide] = useDecideReviewMutation();

    const handleDecision = (id: string, decision: Decision) => {
        decide({ variables: { id, decision } });

        // Remove the review from the list
        setReviews(reviews => reviews.filter(({ _id }) =>
            _id !== id
        ));
    }

    return (
        <div className={classes.root}>
            {reviews.map(rev =>
                <Card key={rev._id} className={classes.card}>
                    <CardContent>
                        <p className={classes.reviewText}>{rev.text}</p>
                        <p className={classes.reviewText}>
                            <FontAwesomeIcon size="lg" icon={faStar} />
                            {rev.value}
                        </p>
                    </CardContent>
                    <CardActionArea>
                        <Button onClick={() => handleDecision(rev._id, Decision.Approved)}>
                            Approve
                        </Button>
                        <Button onClick={() => handleDecision(rev._id, Decision.Rejected)}>
                            Reject
                        </Button>
                        <Button href={`mailto:${rev.writtenBy.email}`}>
                            Email the reviewer
                        </Button>
                    </CardActionArea>
                </Card>
            )}
        </div>
    );
}

export default ReviewsGallery;