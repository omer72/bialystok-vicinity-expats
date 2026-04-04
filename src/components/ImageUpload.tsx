'use client';

import { useRef, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

interface ImageUploadProps {
  value: string;
  onChange: (path: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = 'תמונה' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('הקובץ חייב להיות תמונה');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('גודל הקובץ חייב להיות עד 5MB');
      return;
    }

    setError('');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      if (res.ok) {
        const data = await res.json();
        onChange(data.path);
      } else {
        const err = await res.json();
        setError(err.error || 'שגיאה בהעלאה');
      }
    } catch {
      setError('שגיאה בהעלאה');
    } finally {
      setUploading(false);
    }
  }, [onChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleRemove = () => {
    onChange('');
    setError('');
  };

  const imageUrl = value
    ? value.startsWith('/') || value.startsWith('http')
      ? value
      : `/images/${value}`
    : '';

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {label}
      </Typography>

      {imageUrl ? (
        <Box
          sx={{
            position: 'relative',
            display: 'inline-block',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={imageUrl}
            alt="preview"
            sx={{
              display: 'block',
              maxWidth: '100%',
              maxHeight: 200,
              objectFit: 'contain',
            }}
          />
          <IconButton
            size="small"
            color="error"
            onClick={handleRemove}
            sx={{
              position: 'absolute',
              top: 4,
              left: 4,
              bgcolor: 'rgba(255,255,255,0.85)',
              '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ) : (
        <Box
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          sx={{
            border: '2px dashed',
            borderColor: dragOver ? 'primary.main' : 'divider',
            borderRadius: 1,
            p: 3,
            textAlign: 'center',
            cursor: 'pointer',
            bgcolor: dragOver ? 'action.hover' : 'transparent',
            transition: 'all 0.2s',
          }}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? (
            <CircularProgress size={32} />
          ) : (
            <>
              <CloudUploadIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                גרור תמונה לכאן או לחץ לבחירה
              </Typography>
              <Typography variant="caption" color="text.disabled">
                JPG, PNG, GIF - עד 5MB
              </Typography>
            </>
          )}
        </Box>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {error && (
        <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
          {error}
        </Typography>
      )}

      {imageUrl && !uploading && (
        <Button
          size="small"
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          onClick={() => inputRef.current?.click()}
          sx={{ mt: 1 }}
        >
          החלף תמונה
        </Button>
      )}
    </Box>
  );
}
