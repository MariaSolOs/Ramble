import { useEffect } from 'react';

import Title from 'components/ExperienceBuilderTitle/ExperienceBuilderTitle';
import Subtitle from 'components/ExperienceBuilderSubtitle/ExperienceBuilderSubtitle';

import { useLanguageContext } from 'context/languageContext';

type Props = {
    capacity: number;
    onSlideComplete: (canContinue: boolean) => void;
}

const Capacity = (props: Props) => {
    const { BuilderSlides_Capacity: text } = useLanguageContext().appText;

    const { capacity, onSlideComplete } = props;
    useEffect(() => {
        onSlideComplete(capacity >= 1);
    }, [capacity, onSlideComplete]);

    return (
        <>
            <Title>{text.title}</Title>
            <Subtitle>{text.subtitle}</Subtitle>
        </>
    );
}

export default Capacity;