const styles = (theme) => ({
    //Container
    root: {
        position: 'relative',
        margin: '12vh 0 0',
        height: '84vh',
        width: '100vw',
        padding: '2vh 15% 2vh 9%',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#151515',
        [theme.breakpoints.down('sm')]: { 
            flexDirection: 'column',
            padding: '2% 10% 2% 10%',
            boxSizing: 'border-box',
            overflowY: 'scroll'
        },

        '& .image-gallery-slide .image-gallery-image': {
            maxHeight: '70vh !important'
        },

        '& .image-gallery': {
            position: 'sticky',
            minWidth: '35%',
            maxWidth: 490,
            maxHeight: '80vh',
            [theme.breakpoints.down('sm')]: { 
                marginBottom: '4vh',
                '& .image-gallery-image': {
                    height: 400
                }
            }
        }
    },

    experienceWrapper: {
        overflowY: 'scroll',
        display: 'flex',
        marginBottom: 90,
        [theme.breakpoints.down('sm')]: { 
            overflowY: 'unset',
        }
    },

    shareDialog: {
        '& .MuiDialog-paper': { borderRadius: '1rem' }
    },

    goBackBtn: {
        position: 'absolute',
        top: 25, left: 25,
        color: 'whitesmoke',
        backgroundColor: '#656565',
        '&:hover': { backgroundColor: '#656565' },
        '& svg': { fontSize: '2.1rem' }
    }    
});
export default styles;