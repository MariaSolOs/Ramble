import { useParams } from 'react-router-dom';

import { useGetExperienceQuery } from 'graphql-api';

import Experience from 'components/Experience/Experience';

const ViewExperience = () => {
    const { experienceId } = useParams<{ experienceId: string; }>();
    
    const { data } = useGetExperienceQuery({ variables: { id: experienceId } });

    return (
        <div>
            {data && 
                <Experience experience={data.experience} />}
        </div>
    );
}

export default ViewExperience;