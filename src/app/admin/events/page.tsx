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
import ImageUpload from '@/components/ImageUpload';

interface Event {
  slug: string;
  title: string;
  image?: string;
  body: string;
}

interface EventFormData {
  title: string;
  slug: string;
  image: string;
  body: string;
}

const emptyForm: EventFormData = { title: '', slug: '', image: '', body: '' };

export default function AdminEventsPage() {
  const { showToast } = useAdmin();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [form, setForm] = useState<EventFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    const res = await fetch('/api/admin/events');
    if (res.ok) setEvents(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const openCreate = () => {
    setForm(emptyForm);
    setEditingSlug(null);
    setFormOpen(true);
  };

  const openEdit = async (slug: string) => {
    const res = await fetch(`/api/admin/events/${slug}`);
    if (res.ok) {
      const data = await res.json();
      setForm({ title: data.title, slug: data.slug, image: data.image || '', body: data.body });
      setEditingSlug(slug);
      setFormOpen(true);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = editingSlug ? `/api/admin/events/${editingSlug}` : '/api/admin/events';
      const method = editingSlug ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        showToast(editingSlug ? 'האירוע עודכן בהצלחה' : 'האירוע נוצר בהצלחה');
        setFormOpen(false);
        fetchEvents();
      } else {
        const err = await res.json();
        showToast(err.error || 'שגיאה', 'error');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    const res = await fetch(`/api/admin/events/${slug}`, { method: 'DELETE' });
    if (res.ok) {
      showToast('האירוע נמחק');
      setDeleteConfirm(null);
      fetchEvents();
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
        <Typography variant="h4">אירועים</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>אירוע חדש</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>כותרת</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell align="left" sx={{ width: 120 }}>פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.slug}>
                <TableCell>{event.title}</TableCell>
                <TableCell sx={{ direction: 'ltr', textAlign: 'right' }}>{event.slug}</TableCell>
                <TableCell align="left">
                  <IconButton size="small" onClick={() => openEdit(event.slug)}><EditIcon /></IconButton>
                  <IconButton size="small" color="error" onClick={() => setDeleteConfirm(event.slug)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {events.length === 0 && (
              <TableRow><TableCell colSpan={3} align="center">אין אירועים</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create/Edit Dialog */}
      <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editingSlug ? 'עריכת אירוע' : 'אירוע חדש'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
          <TextField
            label="כותרת"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          {!editingSlug && (
            <TextField
              label="Slug (אופציונלי)"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              helperText="יווצר אוטומטית מהכותרת אם לא יוזן"
              sx={{ direction: 'ltr' }}
            />
          )}
          <ImageUpload
            value={form.image}
            onChange={(path) => setForm({ ...form, image: path })}
          />
          <TextField
            label="תוכן (Markdown)"
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            multiline
            minRows={12}
            sx={{ '& textarea': { direction: 'rtl', fontFamily: 'monospace' } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(false)}>ביטול</Button>
          <Button variant="contained" onClick={handleSave} disabled={saving || !form.title}>
            {saving ? 'שומר...' : 'שמירה'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <DialogTitle>מחיקת אירוע</DialogTitle>
        <DialogContent>
          <Typography>האם למחוק את האירוע הזה? לא ניתן לבטל פעולה זו.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>ביטול</Button>
          <Button color="error" variant="contained" onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>מחיקה</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
