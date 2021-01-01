import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#212121',
            //   main: '#FFFFFF',
        },
        secondary: {
            main: '#304ffe',
        },
    },
});

export default theme;   