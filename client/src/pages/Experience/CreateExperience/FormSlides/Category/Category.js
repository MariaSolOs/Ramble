import React, {useState, useEffect} from 'react';

//Components
import CategoryBox from '../../../../../components/CategoryBox';
import Tip from '../../../../../components/Tip';

//Styles
import {makeStyles} from '@material-ui/core/styles';
import styles from './CategoryStyles';
const useStyles = makeStyles(styles);

const options = ['culture', 'gatherings', 'tastebuds',
                         'entertainment', 'family', 'outdoors'];

const Categories = ({categories, submitInput}) => {
    const classes = useStyles();

    //To handle slide content
    const [slide, setSlide] = useState(1);

    //To handle selection
    const [categs, setCategs] = useState([...categories]);
    const handleClick = (index) => (e) => {
        //Unselect choice
        if(categs.includes(index)) {
            const newSelection = categs.filter(c => c !== index);
            setCategs(newSelection);
        } else if(categs.length < 2) {
            if(categs.includes(index)) {
                const newSelection = categs.filter(c => c !== index);
                setCategs(newSelection);
            } else {
                setCategs([...categs, index]);
                if(slide === 1) { setSlide(2); }
            }
        }
    }
    useEffect(() => {
        submitInput('categories', categs); 
    }, [categs, submitInput]);

    return (
        <>
            <h1 className={classes.title}>
                Category
                <span className={classes.greyCaps}>{slide} of 2</span>
            </h1>
            <p className={classes.description}>
                {slide === 1? 
                'Which category would you say your experience fits the most?' :
                'Which other category would your experience fit in?'}
            </p>
            {slide === 2 &&
            <Tip className={classes.tip}>
                Add a second category to give a unique touch to your experience.
            </Tip>}
            <div className={classes.categoryDiv}> 
                {options.map((categ, index) => (
                    <div key={categ}
                    className={`${classes.categoryItem}
                                ${(categs.includes(index)) && 'selected'}`}
                    onClick={handleClick(index)}>
                        <CategoryBox category={categ} 
                        width="100%" 
                        styles={{ //To have square boxes
                            height: 0,
                            padding: '49% 0 50%'
                        }}/>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Categories;