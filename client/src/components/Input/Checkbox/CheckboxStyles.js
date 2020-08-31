const styles = () => ({
    root: {
        color: '#FFF',
        transition: 'all 200ms ease-in-out',
        '&:hover': { color: '#2F2F2F' }
    },
    checked: {
        '&.MuiCheckbox-colorSecondary': {
            color: '#FFF'
        }
    }
});
export default styles;