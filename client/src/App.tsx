import { CssBaseline, ThemeProvider } from '@mui/material';
import TrainingForm from './components/TrainingForm';
import { theme } from './configs/themeConfig';
import './index.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TrainingForm />
    </ThemeProvider>
  );
}

export default App;
