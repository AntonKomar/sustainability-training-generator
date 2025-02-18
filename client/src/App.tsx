import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import TrainingForm from './components/TrainingForm';
// import './App.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TrainingForm />
    </ThemeProvider>
  );
}

export default App;