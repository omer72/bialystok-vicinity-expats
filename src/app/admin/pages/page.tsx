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
import dynamic from 'next/dynamic';
import { useAdmin } from '../layout';
import ImageUpload from '@/components/ImageUpload';
import PdfUpload from '@/components/PdfUpload';

const HtmlEditor = dynamic(() => import('@/components/HtmlEditor'), { ssr: false });

interface PageItem {
  slug: string;
  title: string;
  image?: string;
  youtubeUrl?: string;
  pdfUrl?: string;
  body: string;
}

interface PageFormData {
  title: string;
  slug: string;
  image: string;
  youtubeUrl: string;
  pdfUrl: string;
  body: string;
}

const emptyForm: PageFormData = { title: '', slug: '', image: '', youtubeUrl: '', pdfUrl: '', body: '' };

export default function AdminPagesPage() {
  const { showToast } = useAdmin();
  const [pages, setPages] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [form, setForm] = useState<PageFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchPages = useCallback(async () => {
    const res = await fetch('/api/admin/pages');
    if (res.ok) setPages(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchPages(); }, [fetchPages]);

  const openCreate = () => {
    setForm(emptyForm);
    setEditingSlug(null);
    setFormOpen(true);
  };

  const openEdit = async (slug: string) => {
    const res = await fetch(`/api/admin/pages/${slug}`);
    if (res.ok) {
      const data = await res.json();
      setForm({ title: data.title, slug: data.slug, image: data.image || '', youtubeUrl: data.youtubeUrl || '', pdfUrl: data.pdfUrl || '', body: data.body });
      setEditingSlug(slug);
      setFormOpen(true);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = editingSlug ? `/api/admin/pages/${editingSlug}` : '/api/admin/pages';
      const method = editingSlug ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        showToast(editingSlug ? 'הדף עודכן בהצלחה' : 'הדף נוצר בהצלחה');
        setFormOpen(false);
        fetchPages();
      } else {
        const err = await res.json();
        showToast(err.error || 'שגיאה', 'error');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    const res = await fetch(`/api/admin/pages/${slug}`, { method: 'DELETE' });
    if (res.ok) {
      showToast('הדף נמחק');
      setDeleteConfirm(null);
      fetchPages();
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
        <Typography variant="h4">דפים</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>דף חדש</Button>
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
            {pages.map((page) => (
              <TableRow key={page.slug}>
                <TableCell>{page.title}</TableCell>
                <TableCell sx={{ direction: 'ltr', textAlign: 'right' }}>{page.slug}</TableCell>
                <TableCell align="left">
                  <IconButton size="small" onClick={() => openEdit(page.slug)}><EditIcon /></IconButton>
                  <IconButton size="small" color="error" onClick={() => setDeleteConfirm(page.slug)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {pages.length === 0 && (
              <TableRow><TableCell colSpan={3} align="center">אין דפים</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create/Edit Dialog */}
      <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editingSlug ? 'עריכת דף' : 'דף חדש'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
          <TextField
            label="כותרת"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <TextField
            label="Slug"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            helperText={editingSlug ? 'לא ניתן לשנות slug קיים' : 'יווצר אוטומטית מהכותרת אם לא יוזן — משמש ל-URL הדינמי'}
            disabled={!!editingSlug}
            required={!editingSlug}
            sx={{ direction: 'ltr' }}
          />
          <ImageUpload
            value={form.image}
            onChange={(path) => setForm({ ...form, image: path })}
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
          <Box>
            <Typography variant="body2" sx={{ mb: 0.5, color: 'text.secondary' }}>תוכן</Typography>
            <HtmlEditor
              value={form.body}
              onChange={(html) => setForm({ ...form, body: html })}
            />
          </Box>
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
        <DialogTitle>מחיקת דף</DialogTitle>
        <DialogContent>
          <Typography>האם למחוק את הדף הזה? לא ניתן לבטל פעולה זו.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>ביטול</Button>
          <Button color="error" variant="contained" onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>מחיקה</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
