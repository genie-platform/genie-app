import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  customGradients: {
    primary: 'linear-gradient(315deg, #F6EBE6 0%, #AEE1F9 74%)',
    secondary: 'linear-gradient(90deg, #cb2d3e 0%, #ef473a 100%)',
    error: 'linear-gradient(90deg, #cb2d3e 0%, #ef473a 100%)',
    primaryDark: 'linear-gradient(to right, #16222A, #3A6073)',
    primaryDark2: 'linear-gradient(60deg, #29323c 0%, #485563 100%);'
  },
  customColors: {
    dark: '#485563',
    backgroundDark: '#333'
  },
  fonts: {
    primary: 'Montserrat, sans-serif',
    genie: 'Gotu'
  }
})
