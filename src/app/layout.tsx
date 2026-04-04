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
  metadataBase: new URL('https://www.bialystokvicinityexpatsisrael.org.il'),
  openGraph: {
    locale: 'he_IL',
    type: 'website',
    siteName: 'ארגון יוצאי ביאליסטוק והסביבה בישראל',
  },
  alternates: {
    canonical: '/',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ארגון יוצאי ביאליסטוק והסביבה בישראל',
  alternateName: 'Bialystok Vicinity Expats Israel Association',
  url: 'https://www.bialystokvicinityexpatsisrael.org.il',
  email: 'bialystok.israel@gmail.com',
  telephone: '+972-54-9932329',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'טננבוים 17',
    addressLocality: 'יהוד',
    addressCountry: 'IL',
    postalCode: '5621108',
  },
  description:
    'עמותה שמטרתה להנציח את 200 אלף בני קהילת יהודי העיר ביאליסטוק שבפולין וסביבותיה, אשר נספו בשואה, להנחיל את מורשתה המפוארת של הקהילה לדורות הבאים.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={heebo.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
