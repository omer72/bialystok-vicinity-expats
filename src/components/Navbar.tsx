'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const navItems = [
  { href: '/', label: 'דף הבית' },
  { href: '/about', label: 'אודות' },
  { href: '/history', label: 'היסטוריה' },
  { href: '/people', label: 'אישים' },
  { href: '/blog', label: 'סיפורי ניצולים' },
  { href: '/events', label: 'אירועים' },
  { href: '/membership', label: 'חברות' },
  { href: '/contact', label: 'צור קשר' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-primary-900/95 backdrop-blur-sm">
      <nav className="mx-auto max-w-7xl px-4 lg:px-8 flex items-center justify-between h-[72px] lg:h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-white font-bold text-heading-sm lg:text-heading-md">
            יוצאי ביאליסטוק
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative px-3 py-2 text-body-sm transition-colors ${
                    isActive
                      ? 'text-white after:absolute after:bottom-0 after:inset-x-3 after:h-[2px] after:bg-accent-500'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <IconButton
          className="lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="פתח תפריט"
          sx={{ color: 'white' }}
        >
          <MenuIcon />
        </IconButton>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 right-0 w-72 h-full bg-primary-900 shadow-xl animate-slide-in-right">
            <div className="flex items-center justify-between h-[60px] px-4">
              <span className="text-white font-bold text-heading-sm">יוצאי ביאליסטוק</span>
              <IconButton onClick={() => setMobileOpen(false)} aria-label="סגור תפריט" sx={{ color: 'white' }}>
                <CloseIcon />
              </IconButton>
            </div>
            <ul className="px-4 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-3 py-3 rounded-lg text-body-md transition-colors ${
                        isActive ? 'text-white bg-primary-700' : 'text-white/80 hover:text-white hover:bg-primary-700/50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
