'use client';

import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import DescriptionIcon from '@mui/icons-material/Description';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';

const DRAWER_WIDTH = 240;
const DRAWER_WIDTH_COLLAPSED = 64;

type ToastSeverity = 'success' | 'error' | 'info' | 'warning';

interface AdminContextValue {
  showToast: (message: string, severity?: ToastSeverity) => void;
}

const AdminContext = createContext<AdminContextValue>({
  showToast: () => {},
});

export function useAdmin() {
  return useContext(AdminContext);
}

const navItems = [
  { label: 'לוח בקרה', href: '/admin', icon: <DashboardIcon /> },
  { label: 'בלוג', href: '/admin/blogs', icon: <ArticleIcon /> },
  { label: 'אישים', href: '/admin/people', icon: <PeopleIcon /> },
  { label: 'אירועים', href: '/admin/events', icon: <EventIcon /> },
  { label: 'דפים', href: '/admin/pages', icon: <DescriptionIcon /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  const currentDrawerWidth = desktopCollapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH;
  const [toast, setToast] = useState<{ open: boolean; message: string; severity: ToastSeverity }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const isLoginPage = pathname === '/admin/login';

  const showToast = useCallback((message: string, severity: ToastSeverity = 'success') => {
    setToast({ open: true, message, severity });
  }, []);

  const handleLogout = () => {
    document.cookie = 'admin_session=; path=/; max-age=0';
    router.push('/admin/login');
  };

  useEffect(() => {
    // Hide main site navbar/footer when admin is mounted
    const navbar = document.querySelector('header');
    const footer = document.querySelector('footer');
    const main = document.getElementById('main-content');
    if (navbar) navbar.style.display = 'none';
    if (footer) footer.style.display = 'none';
    if (main) {
      main.style.flex = 'unset';
      main.style.height = '100dvh';
      main.style.overflow = 'hidden';
    }
    return () => {
      if (navbar) navbar.style.display = '';
      if (footer) footer.style.display = '';
      if (main) {
        main.style.flex = '';
        main.style.height = '';
        main.style.overflow = '';
      }
    };
  }, []);

  if (isLoginPage) {
    return (
      <AdminContext.Provider value={{ showToast }}>
        <Box sx={{ height: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
          {children}
        </Box>
        <Snackbar open={toast.open} autoHideDuration={4000} onClose={() => setToast(t => ({ ...t, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert severity={toast.severity} onClose={() => setToast(t => ({ ...t, open: false }))} variant="filled">{toast.message}</Alert>
        </Snackbar>
      </AdminContext.Provider>
    );
  }

  const mobileDrawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" noWrap sx={{ fontWeight: 700 }}>
          ניהול האתר
        </Typography>
        <IconButton onClick={() => setMobileOpen(false)} aria-label="סגור תפריט">
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.href}
            selected={pathname === item.href}
            onClick={() => {
              router.push(item.href);
              setMobileOpen(false);
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <List sx={{ mt: 'auto' }}>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="התנתקות" />
        </ListItemButton>
      </List>
    </Box>
  );

  const desktopDrawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar sx={{ justifyContent: desktopCollapsed ? 'center' : 'space-between', px: desktopCollapsed ? 0 : 2 }}>
        {!desktopCollapsed && (
          <Typography variant="h6" noWrap sx={{ fontWeight: 700 }}>
            ניהול האתר
          </Typography>
        )}
        <IconButton onClick={() => setDesktopCollapsed(!desktopCollapsed)} aria-label={desktopCollapsed ? 'הרחב תפריט' : 'כווץ תפריט'}>
          {desktopCollapsed ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Toolbar>
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.href}
            selected={pathname === item.href}
            onClick={() => router.push(item.href)}
            sx={{ justifyContent: desktopCollapsed ? 'center' : 'initial', px: desktopCollapsed ? 1 : 2 }}
            title={desktopCollapsed ? item.label : undefined}
          >
            <ListItemIcon sx={{ minWidth: desktopCollapsed ? 0 : 56, justifyContent: 'center' }}>{item.icon}</ListItemIcon>
            {!desktopCollapsed && <ListItemText primary={item.label} />}
          </ListItemButton>
        ))}
      </List>
      <List sx={{ mt: 'auto' }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{ justifyContent: desktopCollapsed ? 'center' : 'initial', px: desktopCollapsed ? 1 : 2 }}
          title={desktopCollapsed ? 'התנתקות' : undefined}
        >
          <ListItemIcon sx={{ minWidth: desktopCollapsed ? 0 : 56, justifyContent: 'center' }}><LogoutIcon /></ListItemIcon>
          {!desktopCollapsed && <ListItemText primary="התנתקות" />}
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <AdminContext.Provider value={{ showToast }}>
      <Box sx={{ display: 'flex', height: '100dvh' }}>
        <AppBar position="fixed" sx={{ width: { md: `calc(100% - ${currentDrawerWidth}px)` }, mr: { md: `${currentDrawerWidth}px` }, transition: 'width 0.2s, margin 0.2s' }}>
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(!mobileOpen)} sx={{ display: { md: 'none' }, mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {navItems.find(i => i.href === pathname)?.label ?? 'ניהול'}
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: DRAWER_WIDTH } }}
        >
          {mobileDrawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          anchor="right"
          sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { width: currentDrawerWidth, boxSizing: 'border-box', transition: 'width 0.2s', overflowX: 'hidden' } }}
          open
        >
          {desktopDrawer}
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${currentDrawerWidth}px)` }, mt: '64px', overflow: 'auto', transition: 'width 0.2s' }}>
          {children}
        </Box>
      </Box>

      <Snackbar open={toast.open} autoHideDuration={4000} onClose={() => setToast(t => ({ ...t, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={toast.severity} onClose={() => setToast(t => ({ ...t, open: false }))} variant="filled">{toast.message}</Alert>
      </Snackbar>
    </AdminContext.Provider>
  );
}
