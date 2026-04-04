import Link from 'next/link';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PlaceIcon from '@mui/icons-material/Place';

const quickLinks = [
  { href: '/', label: 'דף הבית' },
  { href: '/about', label: 'אודות' },
  { href: '/history', label: 'היסטוריה' },
  { href: '/events', label: 'אירועים' },
  { href: '/blog', label: 'סיפורי ניצולים' },
  { href: '/contact', label: 'צור קשר' },
];

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white/80">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Column 1: Logo + description */}
          <div>
            <h3 className="text-white font-bold text-heading-md mb-4">
              ארגון יוצאי ביאליסטוק והסביבה בישראל
            </h3>
            <p className="text-body-sm leading-relaxed">
              עמותה שמטרתה להנציח את קהילת יהודי ביאליסטוק וסביבותיה, להנחיל את מורשתה המפוארת
              לדורות הבאים ולשמור על קשר עם יוצאי העיר לדורותיהם.
            </p>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <h4 className="text-white font-semibold text-heading-sm mb-4">קישורים מהירים</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-body-sm hover:text-accent-300 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact info */}
          <div>
            <h4 className="text-white font-semibold text-heading-sm mb-4">צור קשר</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <PlaceIcon className="text-accent-300 mt-0.5" fontSize="small" />
                <span className="text-body-sm">טננבוים 17, יהוד-מונוסון, ישראל 5621108</span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon className="text-accent-300" fontSize="small" />
                <span className="text-body-sm" dir="ltr">03-5360037, 054-9932329</span>
              </li>
              <li className="flex items-center gap-2">
                <EmailIcon className="text-accent-300" fontSize="small" />
                <a href="mailto:bialystok.israel@gmail.com" className="text-body-sm hover:text-accent-300 transition-colors">
                  bialystok.israel@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-neutral-700 text-center text-body-sm text-white/60">
          © {new Date().getFullYear()} ארגון יוצאי ביאליסטוק והסביבה בישראל. כל הזכויות שמורות.
        </div>
      </div>
    </footer>
  );
}
