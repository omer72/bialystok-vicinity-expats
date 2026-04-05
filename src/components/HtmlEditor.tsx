'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CodeIcon from '@mui/icons-material/Code';
import ImageIcon from '@mui/icons-material/Image';
import LinkIcon from '@mui/icons-material/Link';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import TitleIcon from '@mui/icons-material/Title';

interface HtmlEditorProps {
  value: string;
  onChange: (html: string) => void;
}

function MenuBar({ editor }: { editor: ReturnType<typeof useEditor> }) {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt('הזן כתובת תמונה (URL)');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt('הזן כתובת קישור (URL)');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 0.25,
        p: 0.5,
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'grey.50',
      }}
    >
      <Tooltip title="כותרת 2">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          color={editor.isActive('heading', { level: 2 }) ? 'primary' : 'default'}
        >
          <TitleIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="כותרת 3">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          color={editor.isActive('heading', { level: 3 }) ? 'primary' : 'default'}
          sx={{ '& .MuiSvgIcon-root': { fontSize: '1rem' } }}
        >
          <TitleIcon />
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      <Tooltip title="מודגש">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleBold().run()}
          color={editor.isActive('bold') ? 'primary' : 'default'}
        >
          <FormatBoldIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="נטוי">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          color={editor.isActive('italic') ? 'primary' : 'default'}
        >
          <FormatItalicIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      <Tooltip title="רשימת תבליטים">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          color={editor.isActive('bulletList') ? 'primary' : 'default'}
        >
          <FormatListBulletedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="רשימה ממוספרת">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          color={editor.isActive('orderedList') ? 'primary' : 'default'}
        >
          <FormatListNumberedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="ציטוט">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          color={editor.isActive('blockquote') ? 'primary' : 'default'}
        >
          <FormatQuoteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="קוד">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          color={editor.isActive('codeBlock') ? 'primary' : 'default'}
        >
          <CodeIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      <Tooltip title="תמונה">
        <IconButton size="small" onClick={addImage}>
          <ImageIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="קישור">
        <IconButton
          size="small"
          onClick={addLink}
          color={editor.isActive('link') ? 'primary' : 'default'}
        >
          <LinkIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      <Tooltip title="בטל">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <UndoIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="בצע שוב">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <RedoIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default function HtmlEditor({ value, onChange }: HtmlEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false }),
      Link.configure({ openOnClick: false }),
    ],
    content: value,
    onUpdate: ({ editor: e }) => {
      onChange(e.getHTML());
    },
  });

  // Sync external value changes (e.g. when loading a page for editing)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        overflow: 'hidden',
        '& .tiptap': {
          minHeight: 300,
          p: 2,
          direction: 'rtl',
          outline: 'none',
          '& p': { margin: '0.5em 0' },
          '& h2': { fontSize: '1.5em', fontWeight: 'bold', mt: 1, mb: 0.5 },
          '& h3': { fontSize: '1.25em', fontWeight: 'bold', mt: 1, mb: 0.5 },
          '& ul, & ol': { pr: 3 },
          '& blockquote': {
            borderRight: '3px solid',
            borderColor: 'divider',
            pr: 2,
            mr: 0,
            color: 'text.secondary',
          },
          '& img': { maxWidth: '100%', height: 'auto', borderRadius: 1 },
          '& a': { color: 'primary.main', textDecoration: 'underline' },
          '& pre': {
            bgcolor: 'grey.100',
            p: 1.5,
            borderRadius: 1,
            overflow: 'auto',
            direction: 'ltr',
          },
        },
      }}
    >
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </Box>
  );
}
