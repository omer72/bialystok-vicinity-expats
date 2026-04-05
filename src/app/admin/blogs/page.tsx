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

interface BlogPost {
  slug: string;
  title: string;
  type: string;
  image?: string;
  body: string;
}

interface BlogFormData {
  title: string;
  slug: string;
  images: string[];
  imageDisplayMode: ImageDisplayMode;
  body: string;
}

const emptyForm: BlogFormData = { title: '', slug: '', images: [], imageDisplayMode: 'grid', body: '' };

export default function AdminBlogsPage() {
  const { showToast } = useAdmin();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [form, setForm] = useState<BlogFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    const res = await fetch('/api/admin/blogs');
    if (res.ok) setPosts(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const openCreate = () => {
    setForm(emptyForm);
    setEditingSlug(null);
    setFormOpen(true);
  };

  const openEdit = async (slug: string) => {
    const res = await fetch(`/api/admin/blogs/${slug}`);
    if (res.ok) {
      const data = await res.json();
      setForm({ title: data.title, slug: data.slug, images: data.images || (data.image ? [data.image] : []), imageDisplayMode: data.imageDisplayMode || 'grid', body: data.body });
      setEditingSlug(slug);
      setFormOpen(true);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = editingSlug ? `/api/admin/blogs/${editingSlug}` : '/api/admin/blogs';
      const method = editingSlug ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        showToast(editingSlug ? 'הפוסט עודכן בהצלחה' : 'הפוסט נוצר בהצלחה');
        setFormOpen(false);
        fetchPosts();
      } else {
        const err = await res.json();
        showToast(err.error || 'שגיאה', 'error');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    const res = await fetch(`/api/admin/blogs/${slug}`, { method: 'DELETE' });
    if (res.ok) {
      showToast('הפוסט נמחק');
      setDeleteConfirm(null);
      fetchPosts();
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
        <Typography variant="h4">בלוג</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>פוסט חדש</Button>
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
            {posts.map((post) => (
              <TableRow key={post.slug}>
                <TableCell>{post.title}</TableCell>
                <TableCell sx={{ direction: 'ltr', textAlign: 'right' }}>{post.slug}</TableCell>
                <TableCell align="left">
                  <IconButton size="small" onClick={() => openEdit(post.slug)}><EditIcon /></IconButton>
                  <IconButton size="small" color="error" onClick={() => setDeleteConfirm(post.slug)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {posts.length === 0 && (
              <TableRow><TableCell colSpan={3} align="center">אין פוסטים</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create/Edit Dialog */}
      <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editingSlug ? 'עריכת פוסט' : 'פוסט חדש'}</DialogTitle>
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
        <DialogTitle>מחיקת פוסט</DialogTitle>
        <DialogContent>
          <Typography>האם למחוק את הפוסט הזה? לא ניתן לבטל פעולה זו.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>ביטול</Button>
          <Button color="error" variant="contained" onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>מחיקה</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
