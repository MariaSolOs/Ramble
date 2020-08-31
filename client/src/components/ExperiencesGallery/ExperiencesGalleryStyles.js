const styles = () => ({
    gallery: {
        width: '85%',
        margin: '0 auto 3%',
        display: 'flex',
        flexWrap: 'wrap',
    },

    //Card transitions
    fadeEnter: { 
        opacity: 0,
    },
    fadeEnterActive: { 
        opacity: 1,
        transition: 'all 300ms ease-in'
    },
    fadeExit: { 
        display: 'none',
    }
});
export default styles;