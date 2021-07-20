import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                body: {
                    fontFamily: 'Helvetica, sans-serif',
                    fontWeight: 'bold',
                    letterSpacing: '-0.05rem'
                },

                button: {
                    fontFamily: 'Helvetica, sans-serif',
                    cursor: 'pointer',
                    '&:focus': { outline: 'none' }
                }
            }
        }
    },
    typography: {
        fontFamily: ['Helvetica', 'sans-serif'].join(', ')
    }
});

const GlobalStyles: React.FC = (props) => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
    </ThemeProvider>
);

export default GlobalStyles;