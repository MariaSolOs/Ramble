const styles = (theme) => ({
    root: {
        display: 'flex',
        minHeight: '70vh',
        maxHeight: '84vh',
        width: '100vw',
        margin: '13vh 0 3vh'
    },

    page: {
        width: 'calc(100% - 10px - 6%)',
        maxHeight: '100%'
    },

    shadowSeparator: {
        padding: 5,
        borderRadius: '2rem',
        margin: '0 3%',
        background: 'linear-gradient(to bottom, #1A1A1A, #5B5B5B)'
    },

    experiences: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '5vh'
    }
});
export default styles;