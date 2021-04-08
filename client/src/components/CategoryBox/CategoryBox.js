import React from 'react';

import tasteIcon from './Icons/taste.svg';
import createIcon from './Icons/create.svg';
import relaxIcon from './Icons/relax.svg';
import learnIcon from './Icons/learn.svg';
import moveIcon from './Icons/move.svg';

import { makeStyles } from '@material-ui/core/styles';
import styles from './CategoryBoxStyles';
const useStyles = makeStyles(styles);

const categories = {
    taste: {
        title: { en: 'Taste', fr: 'Goutez' },
        icon: tasteIcon,
        backgroundColor: '#FBAB7E',
        backgroundImage: 'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)'
    },
    create: {
        title: { en: 'Create', fr: 'Créez' },
        icon: createIcon,
        backgroundColor: '#FF9A8B',
        backgroundImage: 'linear-gradient(90deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)'
    },
    relax: {
        title: { en: 'Relax', fr: 'Relaxez' },
        icon: relaxIcon,
        backgroundColor: '#8BC6EC',
        backgroundImage: 'linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)'
    },
    learn: {
        title: { en: 'Learn', fr: 'Apprenez' },
        icon: learnIcon,
        backgroundColor: '#06BEB6',
        backgroundImage: 'linear-gradient(to right, #48B1BF, #06BEB6)'
    },
    move: {
        title: { en: 'Move', fr: 'Bougez' },
        icon: moveIcon,
        backgroundColor: '#FF416C', 
        backgroundImage: 'linear-gradient(to right, #FF4B2B, #FF416C)'
    }
}

const CategoryBox = (props) => {
    const classes = useStyles({
        backgroundColor: categories[props.category].backgroundColor,
        backgroundImage: categories[props.category].backgroundImage,
        width: props.width,
        height: props.height,
        iconLocation: props.iconLocation
    });

    return (
        <div className={classes.root} style={{...props.styles}}>
            <div className={classes.content}>
                <img 
                src={categories[props.category].icon} 
                alt={categories[props.category].title}/>
                <h5 className={classes.title}>
                    {categories[props.category].title[props.lang]}
                </h5>
            </div>
        </div>
    );
}

export default CategoryBox;