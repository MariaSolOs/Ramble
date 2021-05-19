import { useLanguageContext } from '../../context/languageContext';

// import Autocomplete from '@material-ui/lab/Autocomplete';
// import TextField from '@material-ui/core/TextField';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import SearchIcon from '@material-ui/icons/Search';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import ReferBox from '../../components/ReferBox/ReferBox';

import { makeStyles } from '@material-ui/core/styles';
import styles from './HomeStyles';
const useStyles = makeStyles(styles);

const Home = () => {
    const { Home: text } = useLanguageContext().appText;

    const classes = useStyles();

    return (
        <div className={classes.searchSlide}>
            <div className={classes.slideContent}>
                <div className={classes.searchBody}>
                    <h1 className={classes.title}>{text.searchTitle}</h1>
                    <h5 className={classes.subtitle}>{text.searchSubtitle}</h5>
                    <div className={classes.searchBodyRow}>
                        {/* <Autocomplete /> */}
                    </div>
                    <ReferBox />
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