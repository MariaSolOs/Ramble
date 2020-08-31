const styles = () => ({
    nav: {
        display: 'flex',
        '& a': {
            fontFamily: 'Helvetica, sans-serif',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            letterSpacing: '-0.05rem',
            textDecoration: 'none',
            color: '#ACACAC',
            '&.active, &:active, &:hover': {
                color: '#FFF',
                textDecoration: 'none'
            }
        }
    }
});
export default styles;