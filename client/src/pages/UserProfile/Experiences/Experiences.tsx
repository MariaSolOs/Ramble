import { useGetUserExperiencesQuery } from 'graphql-api';

import Spinner from 'components/Spinner/Spinner';
import Layout from '../Layout';

const Experiences = () => {
    const { data, loading } = useGetUserExperiencesQuery();

    if (!data || loading) {
        return <Spinner />;
    }

    return (
        <Layout
        name={data.me.firstName}
        photo={data.me.photo || undefined}
        city={data.me.city || undefined}>
            
        </Layout>
    );
}

export default Experiences;