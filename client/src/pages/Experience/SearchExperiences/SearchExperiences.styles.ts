import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        width: '80vw',
        minWidth: 290,
        maxWidth: '100vw',
        minHeight: 'calc(100vh - 100px)',
        margin: '100px auto 0',

        [theme.breakpoints.down('sm')]: {
            width: '90vw'
        }
    },

    experiences: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 'calc(265px * 4)',
        marginBottom: 30,

        [theme.breakpoints.down('md')]: { width: 'calc(265px * 3)' },
        [theme.breakpoints.down('sm')]: { 
            width: 'calc(265px * 2)',
            margin: '0 auto'
        },
        [theme.breakpoints.down('xs')]: { width: 265 }
    },

    experienceCard: {
        width: 240,
        height: 290,
        margin: '25px 25px 0 0',

        [theme.breakpoints.down('xs')]: { width: 265 }
    },

    cardFadeOut: { 
        opacity: 0,
    }, 

    cardFadeIn: { 
        opacity: 1,
        transition: 'all 300ms ease-in'
    }
});

export default styles;