import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'הצטרפו אלינו',
  description:
    'הצטרפו לארגון יוצאי ביאליסטוק והסביבה בישראל — חברות, התנדבות, תרומה ושאלות נפוצות.',
  alternates: { canonical: '/membership' },
};

export default function MembershipLayout({ children }: { children: React.ReactNode }) {
  return children;
}
