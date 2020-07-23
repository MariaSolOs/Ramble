const styles = (theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        width: '80%',
        height: '90vh',
        margin: '0 auto',
    },

    header: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

        '& h1': {
            fontWeight: 'bold',
            color: '#E6E6E6',
            fontFamily: 'Helvetica, sans-serif',
            letterSpacing: '-0.05rem',
            margin: '0.5rem 0 0',
            fontSize: '2.5rem',
            [theme.breakpoints.down('sm')]: { fontSize: '2rem', },
            [theme.breakpoints.down('xs')]: { fontSize: '1.3rem', }
        }
    },

    //'Get started' button
    getStartedButton: {
        background: 'radial-gradient(circle at 298%, #F7521E, #AC9EFF)',
        border: 'none',
        borderRadius: '1.7rem',
        fontSize: '1.05rem',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '-0.02rem',
        padding: '10px 20px',
        color: '#FFF',
        marginTop: '2rem',
        width: 130,
        textDecoration: 'none',
        textAlign: 'center',
        cursor: 'pointer',
        '&:focus': { outline: 'none' },
        [theme.breakpoints.down('xs')]: {
            width: 110,
            fontSize: '0.7rem',
            padding: 7
        }
    },

    //Image grid
    imgGrid: {
        width: '50%',
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 5rem)',
        gridTemplateRows: 'repeat(4, 5rem)',
        gridGap: '0.2rem',
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: 'repeat(6, 3.5rem)',
            gridTemplateRows: 'repeat(4, 3.5rem)',
            gridGap: '0.1rem',
        },
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: 'repeat(6, 2.15rem)',
            gridTemplateRows: 'repeat(4, 2.15rem)',
        },

        '& .grid-item': { 
            margin: 0,
            '&.grid-item-1': {
                gridColumnStart: 4,
                gridColumnEnd: 5,
                gridRowStart: 2,
                gridRowEnd: 5
            },
            '&.grid-item-2': {
                gridColumnStart: 1,
                gridColumnEnd: 4,
                gridRowStart: 4,
                gridRowEnd: 4
            },
            '&.grid-item-3': {
                gridColumnStart: 1,
                gridColumnEnd: 4,
                gridRowStart: 1,
                gridRowEnd: 4
            },
            '&.grid-item-4': {
                gridColumnStart: 5,
                gridColumnEnd: 7,
                gridRowStart: 2,
                gridRowEnd: 5
            },
            '&.grid-item-5': {
                gridColumnStart: 4,
                gridColumnEnd: 7,
                gridRowStart: 1,
                gridRowEnd: 2
            },
        },
    },

    gridImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
        borderRadius: '0.6rem'
    }
});

export default styles;