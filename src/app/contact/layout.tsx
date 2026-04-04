import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'צור קשר',
  description:
    'צרו קשר עם ארגון יוצאי ביאליסטוק והסביבה בישראל — כתובת, טלפון, דוא"ל וטופס יצירת קשר.',
  alternates: { canonical: '/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
