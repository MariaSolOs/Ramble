import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    landingSlide: {
        margin: '100px auto 0',
        boxSizing: 'border-box',
        display: 'flex',
        width: '65vw',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: { width: '90vw' },
    },

    title: {
        color: '#E6E6E6',
        letterSpacing: '-0.05rem',
        margin: 0,
        fontSize: '2.3rem',
        whiteSpace: 'nowrap',
        [theme.breakpoints.down('sm')]: { fontSize: '1.7rem' },
        [theme.breakpoints.down('xs')]: { fontSize: '1.1rem' }
    },

    landingImg: {
        width: 380,
        height: 'auto',
        borderRadius: '2rem',
        [theme.breakpoints.down('md')]: { width: 320 },
        [theme.breakpoints.down('sm')]: { 
            width: '50%',
            marginLeft: '2%',
            borderRadius: '0.8rem'
        },
        [theme.breakpoints.down('xs')]: { width: '46%' }
    },

    getStartedButton: {
        padding: '10px 20px',
        marginTop: '2rem',
        width: 130,
        fontSize: '1.05rem',
        [theme.breakpoints.down('xs')]: {
            width: 90,
            fontSize: '0.7rem',
            padding: '0.4rem 0.7rem',
            marginTop: '1.4rem'
        }
    },

    creatorSlide: {
        width: '65vw',
        margin: '100px auto 0',
        [theme.breakpoints.down('xs')]: { width: '90vw' },

        '& $title': { display: 'flex' }
    },

    underlined: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '0.55rem',
        [theme.breakpoints.down('xs')]: { 
            marginLeft: '0.45rem',
            '& $gradientLine': { 
                padding: 2,
                marginTop: -3
            }
        }
    },

    gradientLine: {
        padding: 3,
        marginTop: -6,
        borderRadius: '1rem',
        background: 'radial-gradient(circle at 298%, #F7521E, #AC9EFF)'
    },

    creatorCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        margin: '20px auto 0',
        width: '50%',
        height: 250,
        [theme.breakpoints.down('sm')]: { width: '80%' }
    },

    creatorImgContainer: {
        display: 'flex',
        alignItems: 'center'
    },

    creatorImg: {
        borderRadius: '100%',
        height: 150,
        width: 150,
        [theme.breakpoints.down('sm')]: {
            height: 120,
            width: 120
        },
        [theme.breakpoints.down('sm')]: {
            height: 110,
            width: 110
        }
    },

    creatorName: {
        fontSize: '1.5rem',
        color: '#FFF',
        margin: '10px 0 5px 0',
        [theme.breakpoints.down('xs')]: { fontSize: '1.1rem' }
    },

    creatorBio: {
        fontFamily: 'Futura, sans-serif',
        fontWeight: theme.typography.fontWeightRegular,
        color: '#CCCCC6',
        fontSize: '1rem',
        margin: 0,
        lineHeight: 1.4,
        [theme.breakpoints.down('xs')]: { fontSize: '0.85rem' }
    },

    bioArrow: {
        color: '#808080',
        fontSize: '3rem',
        transition: 'ease-in-out 300ms',
        '&:hover': {    
            color: '#FFF',
            cursor: 'pointer'
        }
    },

    zoomEnter: { opacity: 0 },

    zoomEnterActive: { 
        opacity: 1,
        transition: 'all 400ms ease-in'
    },

    zoomExit: { display: 'none' },

    actSlide: {
        width: '65vw',
        margin: '100px auto 90px',
        [theme.breakpoints.down('xs')]: { width: '90vw' },

        '& $title': { display: 'flex' }
    },

    actGraphContainer: {
        position: 'relative',

        '& $gradientLine': {
            width: '75%',
            position: 'absolute',
            top: 33,
            left: '12%',
            zIndex: -1
        }
    },

    actGraph: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 30
    },

    actGraphItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '25%',
        color: '#808080',
        transition: 'color 300ms ease-in-out',
        '&:hover': { color: '#E6E6E6' },
        [theme.breakpoints.down('xs')]: { width: '30%' }
    },

    actGraphCircle: {
        backgroundColor: 'whitesmoke',
        borderRadius: '50%',
        width: 60,
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    
    actGraphIcon: {
        width: 35,
        height: 35
    },

    actGraphText: {
        textAlign: 'center',
        fontSize: '1.1rem',
        lineHeight: 1.2,
        [theme.breakpoints.down('sm')]: { fontSize: '0.9rem' },
        [theme.breakpoints.down('xs')]: { fontSize: '0.75rem' }
    }
});

export default styles;