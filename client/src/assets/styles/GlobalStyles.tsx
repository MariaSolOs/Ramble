import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                body: {
                    backgroundColor: '#151515',
                    fontFamily: 'Helvetica, sans-serif',
                    fontWeight: 'bold',
                    letterSpacing: '-0.05rem',
                    color: '#FFF'
                }
            }
        }
    }
});

const GlobalStyles: React.FC = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            { children }
        </ThemeProvider>
    );
}

export default GlobalStyles;