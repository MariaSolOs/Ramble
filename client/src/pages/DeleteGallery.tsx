import { useEffect } from 'react';

import { 
    useGetExperiencesByStatusLazyQuery, 
    useDeleteExperienceMutation,
    ExperienceStatus 
} from 'graphql-api';
import useSnackbarContext from 'context/snackbarContext';

import CardGallery from 'components/CardGallery/CardGallery';
import Spinner from 'components/Spinner/Spinner';

const DeleteGallery = () => {
    const { showSnackbar } = useSnackbarContext();

    const [getExperiences, { data, loading, refetch }] = useGetExperiencesByStatusLazyQuery({
        variables: { status: [ExperienceStatus.Approved, ExperienceStatus.Rejected] },
        fetchPolicy: 'network-only'
    });

    const [deleteExperience] = useDeleteExperienceMutation({
        onCompleted: () => {
            if (refetch) { refetch(); }
        },
        onError: ({ graphQLErrors }) => {
            const message = graphQLErrors[0].message || 'Deletion failed 😰';
            showSnackbar(message);
        }
    });

    const handleDelete = (id: string) => {
        const canDelete = window.confirm('Are you sure you want to delete this experience?');

        if (canDelete) {
            deleteExperience({ variables: { id } });
        }
    }

    // Fixes weird "no state updates when unmounted" error
    useEffect(() => {
        getExperiences();
    }, [getExperiences]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <CardGallery
        title="Delete experiences"
        experiences={data?.experiencesByStatus}
        onCardClick={handleDelete} />
    );
}

export default DeleteGallery;