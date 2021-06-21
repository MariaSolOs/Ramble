// import { useEffect } from 'react';

import Title from 'components/ExperienceBuilderTitle/ExperienceBuilderTitle';
import Subtitle from 'components/ExperienceBuilderSubtitle/ExperienceBuilderSubtitle';

import { useLanguageContext } from 'context/languageContext';

const Capacity = () => {
    const { BuilderSlides_Capacity: text } = useLanguageContext().appText;

    return (
        <>
            <Title>{text.title}</Title>
            <Subtitle>{text.subtitle}</Subtitle>
        </>
    );
}

export default Capacity;