import { useGetUserProfileQuery } from 'graphql-api';

import Spinner from 'components/Spinner/Spinner';
import Layout from '../Layout';

const PersonalInformation = () => {
    const { data, loading } = useGetUserProfileQuery();
    if (!data || loading) {
        return <Spinner />;
    }

    return (
        <Layout
        name={data.me.firstName}
        onPhotoChange={photo => console.log(photo)}
        photo={data.me.photo || undefined}
        city={data.me.city || undefined}>

        </Layout>
    );
}

export default PersonalInformation;