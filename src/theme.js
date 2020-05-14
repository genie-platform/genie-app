import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00A7FF',
    },
    secondary: {
      main: '#3F3F3F',
    },
  },
  customGradients: {
    primary: 'linear-gradient(135deg, #0089FF, #00C9E5)',
    primaryHover: 'linear-gradient(135deg, #0089FF 0%, #00C9E5 100%)',
    secondary: 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)',
    error: 'linear-gradient(90deg, #cb2d3e 0%, #ef473a 100%)',
    errorHover: 'linear-gradient(90deg, #cb2d3e, #ef473a)',
  },
  customColors: {
    dark: '#485563',
    background: '#f7f8fc',
    backgroundDark: '#333',
    footerBackground: '#363841',
    text: '#616269',
    lightText: 'rgba(160,160,160,0.8)',
  },
  customValues: {
    contentWidth: '100%',
    bigTitleWidth: '30%',
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    button: {
      borderRadius: 8,
    },
  },
});
