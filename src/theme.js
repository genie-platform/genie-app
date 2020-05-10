import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      // main: '#485563',
      main: '#00A7FF',
    },
    secondary: {
      main: '#43e97b',
    },
  },
  customGradients: {
    primary: 'linear-gradient(135deg, #0089FF, #00C9E5)',
    primaryHover: 'linear-gradient(135deg, #0089FF 0%, #00C9E5 100%)',
    secondary: 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)',
    error: 'linear-gradient(90deg, #cb2d3e 0%, #ef473a 100%)',
  },
  customColors: {
    dark: '#485563',
    background: '#f7f8fc',
    backgroundDark: '#333',
    footerBackground: '#363841',
  },
  customValues: {
    contentWidth: '76%',
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    button: {
      borderRadius: 8,
    },
  },
});
