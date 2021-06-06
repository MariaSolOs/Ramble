import { useLanguageContext } from '../../context/languageContext';
import type { Category } from '../../models/experience';

import tasteIcon from '../../assets/images/category-taste.svg';
import createIcon from '../../assets/images/category-create.svg';
import relaxIcon from '../../assets/images/category-relax.svg';
import learnIcon from '../../assets/images/category-learn.svg';
import moveIcon from '../../assets/images/category-move.svg';

import { makeStyles } from '@material-ui/core/styles';
import styles from './CategoryBox.styles';
const useStyles = makeStyles(styles);

type CategoryInfo = {
    icon: string;
    backgroundColor: string;
    backgroundImage: string;
}

const categories: Record<Category, CategoryInfo> = {
    taste: {
        icon: tasteIcon,
        backgroundColor: '#FBAB7E',
        backgroundImage: 'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)'
    },
    create: {
        icon: createIcon,
        backgroundColor: '#FF9A8B',
        backgroundImage: 'linear-gradient(90deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)'
    },
    relax: {
        icon: relaxIcon,
        backgroundColor: '#8BC6EC',
        backgroundImage: 'linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)'
    },
    learn: {
        icon: learnIcon,
        backgroundColor: '#06BEB6',
        backgroundImage: 'linear-gradient(to right, #48B1BF, #06BEB6)'
    },
    move: {
        icon: moveIcon,
        backgroundColor: '#FF416C', 
        backgroundImage: 'linear-gradient(to right, #FF4B2B, #FF416C)'
    }
} as const;

type Props = {
    category: Category;
    iconLocation: 'top' | 'left';
    boxClass?: string;
}

export type StyleProps = {
    backgroundColor: string;
    backgroundImage: string;
    iconLocation: 'top' | 'left';
}

const CategoryBox = (props: Props) => {
    const { CategoryBox: text } = useLanguageContext().appText;

    const category = {
        ...categories[props.category],
        title: text[props.category]
    }

    const classes = useStyles({
        backgroundColor: category.backgroundColor,
        backgroundImage: category.backgroundImage,
        iconLocation: props.iconLocation
    });

    return (
        <div className={`${classes.root} ${props.boxClass}`}>
            <div className={classes.content}>
                <img src={category.icon} alt={category.title} className={classes.icon} />
                <span className={classes.title}>
                    {category.title}
                </span>
            </div>
        </div>
    );
}

export default CategoryBox;