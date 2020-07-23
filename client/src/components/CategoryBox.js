import React from 'react';

//Styles
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '1rem',
        display: 'flex',
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        background: props => props.background,
        width: props => props.width,
        height: props => props.height,
    },
    title: {
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 600,
        fontSize: '1.05rem',
        color: 'white',
        letterSpacing: '-0.04rem',
        textAlign: 'center'
    }
}));

const Categories = {
    culture: {
        title: 'Arts & Culture',
        background: 'radial-gradient(circle at 79.36%, #F7521E, #BC3A6F)'
    },
    gatherings: {
        title: 'People & Gatherings',
        background: 'radial-gradient(circle at 79.36%, #F73E00, #FFAA00)'
    },
    tastebuds: {
        title: 'Tastebuds',
        background: 'radial-gradient(circle at 79.36%, #F4F032, #FFB12C)'
    },
    entertainment: {
        title: 'Entertainment',
        background: 'radial-gradient(circle at 79.36%, #7A2ABC, #E464F5)'
    },
    family: {
        title: 'Family',
        background: 'radial-gradient(circle at 79.36%, #784AF5, #20A9FE)'
    },
    outdoors: {
        title: 'Outdoors',
        background: 'radial-gradient(circle at 79.36%, #BEF16C, #00D38A)'
    }
}

/**
 * Colored category box.
 * @param {string} category - One of [culture, gatherings, tastebuds, 
 *                                    entertainment, family, outdoors]
 * @param {number} width - Desired box width
 * @param {number} height - Desired box height
 * @param {Object} styles - Any other extra styles
 */
const CategoryBox = (props) => {
    const classes = useStyles({
        background: Categories[props.category].background,
        width: props.width,
        height: props.height
    });
    return (
        <div className={classes.root} style={{...props.styles}}>
            <h5 className={classes.title}>{Categories[props.category].title}</h5>
        </div>
    );
}

export default CategoryBox;