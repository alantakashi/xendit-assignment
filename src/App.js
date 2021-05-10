import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles';
import Routes from './routes';
import './App.css';

const theme = createMuiTheme({
  primary: {
      main: "#2196f3"
  },
  text: {
    primary: "#000000",
    secondary: "#007ede",
    billing: "#007ede"
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      "Roboto", 
      "Helvetica", 
      "Arial",
      "Microsoft Yahei",
      "微软雅黑", 
      "STXihei", 
      "华文细黑", 
      "sans-serif"
    ].join(','),
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </MuiThemeProvider>
  );
}

export default App;
