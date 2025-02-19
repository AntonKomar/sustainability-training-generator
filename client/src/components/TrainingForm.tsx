import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useCallback, useState } from 'react';
import MarkdownRenderer from './MarkdownRenderer';

interface FormData {
  companyName: string;
  industry: string;
  goals: string;
  context: string;
}

const INDUSTRIES = [
  'Technology',
  'Manufacturing',
  'Retail',
  'Healthcare',
  'Energy',
  'Other',
] as const;

const TrainingForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    industry: '',
    goals: '',
    context: '',
  });
  const [outline, setOutline] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:4001/api/training', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setOutline(result.data.outline);
    } catch (err) {
      setError('Failed to generate training outline. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleCloseError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <Container maxWidth="md" className="!py-8">
      <Typography variant="h4" component="h1" gutterBottom align="center" className="!mb-6">
        Sustainability Training Generator
      </Typography>

      <Paper elevation={3} className="!rounded-2xl !p-6">
        <Box component="form" onSubmit={handleSubmit} noValidate className="!space-y-4">
          <TextField
            margin="normal"
            required
            fullWidth
            id="companyName"
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            autoFocus
            className="!mb-4"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            select
            id="industry"
            label="Industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="!mb-4"
          >
            {INDUSTRIES.map(industry => (
              <MenuItem key={industry} value={industry}>
                {industry}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            margin="normal"
            required
            fullWidth
            multiline
            rows={4}
            id="goals"
            label="Sustainability Goals"
            name="goals"
            value={formData.goals}
            onChange={handleChange}
            className="!mb-4"
          />

          <TextField
            margin="normal"
            fullWidth
            multiline
            rows={4}
            id="context"
            label="Additional Context"
            name="context"
            value={formData.context}
            onChange={handleChange}
            className="!mb-4"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            className="!mt-4 !rounded-lg"
          >
            {loading ? <CircularProgress size={24} /> : 'Generate Training Outline'}
          </Button>
        </Box>
      </Paper>

      {outline && (
        <Paper elevation={3} className="!mt-6 !rounded-2xl !p-6">
          <Typography variant="h5" gutterBottom className="!mb-4">
            Training Outline
          </Typography>
          <MarkdownRenderer content={outline} />
        </Paper>
      )}

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TrainingForm;
