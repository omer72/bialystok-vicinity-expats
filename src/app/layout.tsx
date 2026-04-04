import type { Metadata } from 'next';
import { Heebo } from 'next/font/google';
import './globals.css';
import ThemeRegistry from '@/theme/ThemeRegistry';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const heebo = Heebo({
  subsets: ['latin', 'hebrew'],
  variable: '--font-heebo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'ארגון יוצאי ביאליסטוק והסביבה בישראל',
    template: '%s | ארגון יוצאי ביאליסטוק והסביבה בישראל',
  },
  description:
    'אתר הבית של ארגון יוצאי ביאליסטוק והסביבה בישראל — הנצחת קהילת יהודי ביאליסטוק והנחלת מורשתה לדורות הבאים.',
  keywords: ['ביאליסטוק', 'שואה', 'הנצחה', 'יהוד', 'קריית ביאליסטוק', 'ניצולים'],
  openGraph: {
    locale: 'he_IL',
    type: 'website',
    siteName: 'ארגון יוצאי ביאליסטוק והסביבה בישראל',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={heebo.className}>
      <body className="min-h-dvh flex flex-col bg-neutral-50 text-neutral-900 antialiased">
        <ThemeRegistry>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-primary-900 focus:text-white focus:p-4"
          >
            דלג לתוכן הראשי
          </a>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
