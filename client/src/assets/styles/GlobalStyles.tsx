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
    },
    typography: {
        fontFamily: ['Helvetica', 'sans-serif'].join(', ')
    }
});

const GlobalStyles: React.FC = ({ children }) => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        { children }
    </ThemeProvider>
);

export default GlobalStyles;