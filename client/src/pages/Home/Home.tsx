import { useLanguageContext } from '../../context/languageContext';

import { makeStyles } from '@material-ui/core/styles';
import styles from './HomeStyles';
const useStyles = makeStyles(styles);

const Home = () => {
    const { Home: text } = useLanguageContext().appText;

    const classes = useStyles();

    fetch('https://www.experienceramble.com/api/exp/locations', {
        headers: {
            'Access-Control-Allow-Origin': 'https://www.experienceramble.com'
        }
    }).then(res => res.json());

    return (
        <div className={classes.slide}>
            <div className={classes.content}>
                <div className={classes.searchBody}>
                    <h1 className={classes.title}>{text.searchTitle}</h1>
                    <h5 className={classes.subtitle}>{text.searchSubtitle}</h5>
                </div>
                <div className={classes.imageContainer}>
                    <img
                    src={`${process.env.REACT_APP_CLOUDINARY_BASE_URI}c_fill,g_north,h_700,w_550/v1612149396/Ramble/Homepage/cocktailparty.jpg`}
                    alt="Cocktail party"
                    className={classes.image} />
                </div>
            </div>
        </div>
    );
}

export default Home;