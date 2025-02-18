// src/components/TrainingForm.tsx
import { useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Container,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import axios from 'axios';

interface FormData {
  companyName: string;
  industry: string;
  goals: string;
  context: string;
}

const industries = [
  'Technology',
  'Manufacturing',
  'Retail',
  'Healthcare',
  'Energy',
  'Other'
];

const TrainingForm = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    industry: '',
    goals: '',
    context: ''
  });
  const [outline, setOutline] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('http://localhost:3001/api/generate', formData);
      setOutline(response.data.outline);
    } catch (err) {
      setError('Failed to generate training outline. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Sustainability Training Generator
        </Typography>

        <Paper elevation={3} sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            >
              {industries.map((industry) => (
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
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Generate Training Outline'}
            </Button>
          </Box>
        </Paper>

        {outline && (
          <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Training Outline
            </Typography>
            <Typography component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
              {outline}
            </Typography>
          </Paper>
        )}

        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default TrainingForm;