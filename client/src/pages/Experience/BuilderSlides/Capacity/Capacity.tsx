import { useEffect } from 'react';

import Title from 'components/ExperienceBuilderTitle/ExperienceBuilderTitle';
import Subtitle from 'components/ExperienceBuilderSubtitle/ExperienceBuilderSubtitle';
import Tip from 'components/Tip/Tip';
import PlusMinusInput from 'components/PlusMinusInput/PlusMinusInput';

import { useLanguageContext } from 'context/languageContext';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Capacity.styles';
const useStyles = makeStyles(styles);

type Props = {
    capacity: number;
    onCapacityChange: (capacity: number) => void;
    onSlideComplete: (canContinue: boolean) => void;
}

const Capacity = (props: Props) => {
    const { BuilderSlides_Capacity: text } = useLanguageContext().appText;
    const classes = useStyles();

    const { capacity, onSlideComplete } = props;
    useEffect(() => {
        onSlideComplete(capacity >= 1);
    }, [capacity, onSlideComplete]);

    return (
        <>
            <Title>{text.title}</Title>
            <Subtitle>{text.subtitle}</Subtitle>
            <Tip className={classes.tip}>{text.tip}</Tip>
            <PlusMinusInput
            value={capacity}
            minValue={1}
            step={1}
            onValueChange={props.onCapacityChange}
            containerClass={classes.capacityField}
            getLabel={val => val > 1 ? text.people : text.person} />
        </>
    );
}

export default Capacity;