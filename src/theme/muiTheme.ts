'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#2A5A8C',
      dark: '#1B3A5C',
      light: '#7AADE0',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#8B6914',
      dark: '#6B5010',
      light: '#C4941A',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F8F8FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A2E',
      secondary: '#6B6B80',
    },
    error: { main: '#C0392B' },
    warning: { main: '#D4A017' },
    success: { main: '#2D8A56' },
    info: { main: '#2A5A8C' },
  },
  typography: {
    fontFamily: '"Heebo", "Arial", sans-serif',
    h1: { fontSize: '3rem', fontWeight: 800, lineHeight: 1.1 },
    h2: { fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.2 },
    h3: { fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.3 },
    h4: { fontSize: '1.375rem', fontWeight: 600, lineHeight: 1.3 },
    h5: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.4 },
    body1: { fontSize: '1rem', lineHeight: 1.7 },
    body2: { fontSize: '0.875rem', lineHeight: 1.6 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, padding: '12px 28px' },
        containedPrimary: { '&:hover': { transform: 'translateY(-1px)' } },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid #D4D4DE',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.2s ease-in-out',
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined', fullWidth: true },
    },
  },
});

export default theme;
