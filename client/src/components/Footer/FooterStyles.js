const styles = (theme) => ({
    footer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        cursor: 'default',
        '& $header, & $body': {
            width: '45%',
            marginLeft: '15%', 
            [theme.breakpoints.down('sm')]: {
                width: '75%',
                marginLeft: '10%', 
            },
            [theme.breakpoints.down('xs')]: {
                width: '95%',
                marginLeft: '5%', 
            }
        },
        '& a, & .open-dialog': {
            color: '#C0BFBA',
            textDecoration: 'none',
            letterSpacing: '-0.05rem',
            fontSize: '0.85rem',
        }
    },

    header: {
        fontFamily: 'Futura',
        fontSize: '2rem',
        letterSpacing: '-0.07rem',
        color: '#F6F6F6',
    },

    body: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '2rem 0 3rem'
    },
    bodyCol: {
        display: 'flex',
        flexDirection: 'column',
        '& > a, & > span': { 
            display: 'block', 
            lineHeight: 1.7,
            transition: 'all 150ms ease-in-out',
            '&:hover': { color: '#FFF' }
        },
    },

    colTitle: {
        fontSize: '1rem',
        letterSpacing: '-0.07rem',
        fontWeight: 600,
        color: '#ECEBE5',
        marginBottom: '0.7rem'
    },

    //Chips
    chip: {
        backgroundColor: 'rgba(65, 65, 65, 0.9)',
        color: '#FFF',
        fontFamily: 'inherit',
        fontWeight: 'bold',
        letterSpacing: '-0.05rem',
        width: 'fit-content',
        padding: '3px 10px',
        marginRight: 10
    },

    //Media icons
    icon: {
        color: '#C0BFBA',
        fontSize: '1.8rem',
        marginRight: 10,
        transition: 'all 150ms ease-in-out',
        '&.facebook': { '&:hover': { color: '#3B579D' }},
        '&.instagram': {
            borderRadius: 10,
            '&:hover': {
                color: '#FFF',
                backgroundImage: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
            }
        }
    },

    //Copyright container
    bottom: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '80%',
        margin: '0 auto 3rem 15%',
        '& p': {
            margin: 0,
            display: 'inline',
            color: '#C0BFBA',
            fontSize: '0.85rem',
            letterSpacing: '-0.05rem'
        },
        '& > div a': {
            marginLeft: 20
        },
        [theme.breakpoints.down('sm')]: { marginLeft: '10%' },
        [theme.breakpoints.down('xs')]: {
            marginLeft: '5%', 
            width: '95%',
        }
    }
});

export default styles;