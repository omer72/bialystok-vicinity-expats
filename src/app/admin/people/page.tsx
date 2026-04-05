'use client';

import { useEffect, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useAdmin } from '../layout';
import MultiImageUpload from '@/components/MultiImageUpload';
import ImageDisplayModeToggle, { type ImageDisplayMode } from '@/components/ImageDisplayModeToggle';
import PdfUpload from '@/components/PdfUpload';

interface Person {
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  image?: string;
  youtubeUrl?: string;
  pdfUrl?: string;
  contentSlug?: string;
}

interface PersonFormData {
  name: string;
  nameEn: string;
  slug: string;
  description: string;
  images: string[];
  imageDisplayMode: ImageDisplayMode;
  youtubeUrl: string;
  pdfUrl: string;
  body: string;
}

const emptyForm: PersonFormData = { name: '', nameEn: '', slug: '', description: '', images: [], imageDisplayMode: 'grid', youtubeUrl: '', pdfUrl: '', body: '' };

export default function AdminPeoplePage() {
  const { showToast } = useAdmin();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [form, setForm] = useState<PersonFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchPeople = useCallback(async () => {
    const res = await fetch('/api/admin/people');
    if (res.ok) setPeople(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchPeople(); }, [fetchPeople]);

  const openCreate = () => {
    setForm(emptyForm);
    setEditingSlug(null);
    setFormOpen(true);
  };

  const openEdit = async (slug: string) => {
    const res = await fetch(`/api/admin/people/${slug}`);
    if (res.ok) {
      const data = await res.json();
      setForm({
        name: data.name,
        nameEn: data.nameEn,
        slug: data.slug,
        description: data.description || '',
        images: data.images || (data.image ? [data.image] : []),
        imageDisplayMode: data.imageDisplayMode || 'grid',
        youtubeUrl: data.youtubeUrl || '',
        pdfUrl: data.pdfUrl || '',
        body: data.body || '',
      });
      setEditingSlug(slug);
      setFormOpen(true);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = editingSlug ? `/api/admin/people/${editingSlug}` : '/api/admin/people';
      const method = editingSlug ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        showToast(editingSlug ? 'האיש עודכן בהצלחה' : 'האיש נוצר בהצלחה');
        setFormOpen(false);
        fetchPeople();
      } else {
        const err = await res.json();
        showToast(err.error || 'שגיאה', 'error');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    const res = await fetch(`/api/admin/people/${slug}`, { method: 'DELETE' });
    if (res.ok) {
      showToast('האיש נמחק');
      setDeleteConfirm(null);
      fetchPeople();
    } else {
      showToast('שגיאה במחיקה', 'error');
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">אישים</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>איש חדש</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>שם</TableCell>
              <TableCell>שם באנגלית</TableCell>
              <TableCell>תיאור</TableCell>
              <TableCell align="left" sx={{ width: 120 }}>פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map((person) => (
              <TableRow key={person.slug}>
                <TableCell>{person.name}</TableCell>
                <TableCell sx={{ direction: 'ltr', textAlign: 'right' }}>{person.nameEn}</TableCell>
                <TableCell sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {person.description}
                </TableCell>
                <TableCell align="left">
                  <IconButton size="small" onClick={() => openEdit(person.slug)}><EditIcon /></IconButton>
                  <IconButton size="small" color="error" onClick={() => setDeleteConfirm(person.slug)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {people.length === 0 && (
              <TableRow><TableCell colSpan={4} align="center">אין אישים</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create/Edit Dialog */}
      <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editingSlug ? 'עריכת איש' : 'איש חדש'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
          <TextField
            label="שם"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <TextField
            label="שם באנגלית"
            value={form.nameEn}
            onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
            required
            sx={{ direction: 'ltr' }}
          />
          {!editingSlug && (
            <TextField
              label="Slug (אופציונלי)"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              helperText="יווצר אוטומטית מהשם באנגלית"
              sx={{ direction: 'ltr' }}
            />
          )}
          <TextField
            label="תיאור"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            multiline
            minRows={2}
          />
          <MultiImageUpload
            value={form.images}
            onChange={(images) => setForm({ ...form, images })}
          />
          <ImageDisplayModeToggle
            value={form.imageDisplayMode}
            onChange={(mode) => setForm({ ...form, imageDisplayMode: mode })}
            visible={form.images.length >= 2}
          />
          <TextField
            label="קישור YouTube"
            value={form.youtubeUrl}
            onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
            placeholder="https://www.youtube.com/watch?v=..."
            sx={{ direction: 'ltr' }}
          />
          <PdfUpload
            value={form.pdfUrl}
            onChange={(path) => setForm({ ...form, pdfUrl: path })}
          />
          <TextField
            label="תוכן (Markdown)"
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            multiline
            minRows={10}
            sx={{ '& textarea': { direction: 'rtl', fontFamily: 'monospace' } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(false)}>ביטול</Button>
          <Button variant="contained" onClick={handleSave} disabled={saving || !form.name || !form.nameEn}>
            {saving ? 'שומר...' : 'שמירה'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <DialogTitle>מחיקת איש</DialogTitle>
        <DialogContent>
          <Typography>האם למחוק את הרשומה הזו? לא ניתן לבטל פעולה זו.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>ביטול</Button>
          <Button color="error" variant="contained" onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>מחיקה</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
