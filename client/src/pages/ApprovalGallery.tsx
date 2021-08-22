import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useGetExperiencesByStatusLazyQuery, ExperienceStatus } from 'graphql-api';

import CardGallery from 'components/CardGallery/CardGallery';
import Spinner from 'components/Spinner/Spinner';

const ApprovalGallery = () => {
    const history = useHistory();

    const [getExperiences, { data, loading }] = useGetExperiencesByStatusLazyQuery({
        variables: { status: [ExperienceStatus.Pending] },
        fetchPolicy: 'network-only'
    });

    // Fixes weird "no state updates when unmounted" error
    useEffect(() => {
        getExperiences();
    }, [getExperiences]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <CardGallery
        title="Unapproved Experiences"
        experiences={data?.experiencesByStatus}
        onCardClick={id => history.push(`/view/${id}`)} />
    );
}

export default ApprovalGallery;