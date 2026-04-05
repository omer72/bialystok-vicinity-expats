'use client';

import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';

export type ImageDisplayMode = 'grid' | 'carousel';

interface ImageDisplayModeToggleProps {
  value: ImageDisplayMode;
  onChange: (mode: ImageDisplayMode) => void;
  visible: boolean;
}

export default function ImageDisplayModeToggle({
  value,
  onChange,
  visible,
}: ImageDisplayModeToggleProps) {
  if (!visible) return null;

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        מצב תצוגה
      </Typography>
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={(_, newMode) => {
          if (newMode) onChange(newMode);
        }}
        size="medium"
        aria-label="Image display mode"
      >
        <ToggleButton value="grid" sx={{ minWidth: 120, gap: 1 }}>
          <GridViewIcon sx={{ fontSize: 20 }} />
          גריד
        </ToggleButton>
        <ToggleButton value="carousel" sx={{ minWidth: 120, gap: 1 }}>
          <ViewCarouselIcon sx={{ fontSize: 20 }} />
          קרוסלה
        </ToggleButton>
      </ToggleButtonGroup>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
        כיצד התמונות יוצגו בדף הציבורי
      </Typography>
    </Box>
  );
}
