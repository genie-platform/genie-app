import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      // main: '#485563',
      main: '#384aff',
    },
    secondary: {
      main: '#43e97b',
    },
  },
  customGradients: {
    primary: 'linear-gradient(to right, #16222A, #3A6073)',
    secondary: 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)',
    error: 'linear-gradient(90deg, #cb2d3e 0%, #ef473a 100%)',
  },
  customColors: {
    dark: '#485563',
    background: '#f7f8fc',
    backgroundDark: '#333',
    footerBackground: '#363841',
  },
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    button: {
      borderRadius: 8,
    },
  },
});
