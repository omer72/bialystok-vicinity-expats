'use client';

import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ArticleIcon from '@mui/icons-material/Article';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import DescriptionIcon from '@mui/icons-material/Description';

interface ContentCounts {
  blogs: number;
  people: number;
  events: number;
  pages: number;
}

const sections = [
  { key: 'blogs' as const, label: 'פוסטים בבלוג', icon: <ArticleIcon sx={{ fontSize: 40 }} />, color: '#2A5A8C' },
  { key: 'people' as const, label: 'אישים', icon: <PeopleIcon sx={{ fontSize: 40 }} />, color: '#8B6914' },
  { key: 'events' as const, label: 'אירועים', icon: <EventIcon sx={{ fontSize: 40 }} />, color: '#2D8A56' },
  { key: 'pages' as const, label: 'דפים', icon: <DescriptionIcon sx={{ fontSize: 40 }} />, color: '#C0392B' },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState<ContentCounts | null>(null);

  useEffect(() => {
    async function fetchCounts() {
      const [blogs, people, events, pages] = await Promise.all([
        fetch('/api/admin/blogs').then(r => r.json()),
        fetch('/api/admin/people').then(r => r.json()),
        fetch('/api/admin/events').then(r => r.json()),
        fetch('/api/admin/pages').then(r => r.json()),
      ]);
      setCounts({
        blogs: Array.isArray(blogs) ? blogs.length : 0,
        people: Array.isArray(people) ? people.length : 0,
        events: Array.isArray(events) ? events.length : 0,
        pages: Array.isArray(pages) ? pages.length : 0,
      });
    }
    fetchCounts();
  }, []);

  if (!counts) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>לוח בקרה</Typography>
      <Grid container spacing={3}>
        {sections.map((section) => (
          <Grid key={section.key} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <Box sx={{ color: section.color, mb: 1 }}>{section.icon}</Box>
                <Typography variant="h3" sx={{ fontWeight: 700, color: section.color }}>
                  {counts[section.key]}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {section.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
