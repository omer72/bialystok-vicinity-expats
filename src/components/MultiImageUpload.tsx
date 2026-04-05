'use client';

import { useRef, useState, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Button from '@mui/material/Button';

interface MultiImageUploadProps {
  value: string[];
  onChange: (images: string[]) => void;
  label?: string;
}

function resolveImageUrl(value: string): string {
  if (!value) return '';
  return value.startsWith('/') || value.startsWith('http') ? value : `/images/${value}`;
}

function SortableImage({
  id,
  url,
  onRemove,
}: {
  id: string;
  url: string;
  onRemove: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      sx={{
        position: 'relative',
        width: 96,
        height: 96,
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: isDragging ? 'primary.main' : 'divider',
        flexShrink: 0,
        bgcolor: '#EDEDF2',
        '&:hover': {
          borderColor: 'primary.light',
          boxShadow: 1,
        },
      }}
    >
      <Box
        component="img"
        src={resolveImageUrl(url)}
        alt=""
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
      {/* Drag handle */}
      <IconButton
        size="small"
        {...attributes}
        {...listeners}
        sx={{
          position: 'absolute',
          top: 2,
          left: '50%',
          transform: 'translateX(-50%)',
          bgcolor: 'rgba(255,255,255,0.85)',
          '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
          cursor: 'grab',
          p: 0.25,
        }}
        aria-label="Drag to reorder"
      >
        <DragIndicatorIcon sx={{ fontSize: 16 }} />
      </IconButton>
      {/* Remove button */}
      <IconButton
        size="small"
        color="error"
        onClick={onRemove}
        sx={{
          position: 'absolute',
          top: 2,
          right: 2,
          bgcolor: 'rgba(255,255,255,0.85)',
          '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
          p: 0.25,
        }}
        aria-label="Remove image"
      >
        <DeleteIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </Box>
  );
}

export default function MultiImageUpload({
  value,
  onChange,
  label = 'תמונות',
}: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const uploadFile = useCallback(
    async (file: File) => {
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
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });
        if (res.ok) {
          const data = await res.json();
          onChange([...value, data.path]);
        } else {
          const err = await res.json();
          setError(err.error || 'שגיאה בהעלאה');
        }
      } catch {
        setError('שגיאה בהעלאה');
      } finally {
        setUploading(false);
      }
    },
    [onChange, value]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => uploadFile(file));
    }
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files) {
      Array.from(files).forEach((file) => uploadFile(file));
    }
  };

  const handleRemove = (index: number) => {
    const next = value.filter((_, i) => i !== index);
    onChange(next);
    setError('');
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = value.indexOf(active.id as string);
      const newIndex = value.indexOf(over.id as string);
      onChange(arrayMove(value, oldIndex, newIndex));
    }
  };

  const hasImages = value.length > 0;

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {label}
      </Typography>

      {hasImages && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={value}
            strategy={horizontalListSortingStrategy}
          >
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1.5,
                mb: 1.5,
              }}
            >
              {value.map((img, index) => (
                <SortableImage
                  key={img}
                  id={img}
                  url={img}
                  onRemove={() => handleRemove(index)}
                />
              ))}
            </Box>
          </SortableContext>
        </DndContext>
      )}

      {/* Drop zone / Add more */}
      <Box
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        sx={{
          border: '2px dashed',
          borderColor: dragOver ? 'primary.main' : 'divider',
          borderRadius: 1,
          p: hasImages ? 2 : 3,
          textAlign: 'center',
          cursor: 'pointer',
          bgcolor: dragOver ? 'action.hover' : '#F8F8FA',
          transition: 'all 0.2s',
          '&:hover': {
            borderColor: 'primary.main',
            bgcolor: '#EFF5FB',
          },
        }}
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? (
          <CircularProgress size={32} />
        ) : (
          <>
            <CloudUploadIcon
              sx={{ fontSize: hasImages ? 28 : 40, color: 'text.secondary', mb: 0.5 }}
            />
            <Typography variant="body2" color="text.secondary">
              {hasImages ? 'הוסף תמונות נוספות' : 'גרור תמונות לכאן או לחץ לבחירה'}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              JPG, PNG, GIF - עד 5MB לתמונה
            </Typography>
          </>
        )}
      </Box>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {error && (
        <Typography
          variant="caption"
          color="error"
          sx={{ mt: 0.5, display: 'block' }}
        >
          {error}
        </Typography>
      )}

      {hasImages && !uploading && (
        <Button
          size="small"
          variant="outlined"
          startIcon={<AddPhotoAlternateIcon />}
          onClick={() => inputRef.current?.click()}
          sx={{ mt: 1 }}
        >
          הוסף תמונות
        </Button>
      )}
    </Box>
  );
}
