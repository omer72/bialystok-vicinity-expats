'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import GroupsIcon from '@mui/icons-material/Groups';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PageHeader from '@/components/PageHeader';
import SectionHeader from '@/components/SectionHeader';

const benefits = [
  {
    icon: <HistoryEduIcon sx={{ fontSize: 32 }} />,
    title: 'שימור מורשת',
    description: 'סייעו בשימור זכרון קהילת ביאליסטוק לדורות הבאים.',
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 32 }} />,
    title: 'אירועים קהילתיים',
    description: 'השתתפו בטכסי אזכרה, כנסים ומפגשים.',
  },
  {
    icon: <FavoriteIcon sx={{ fontSize: 32 }} />,
    title: 'קשר קהילתי',
    description: 'חברו למשפחה גדולה של יוצאי ביאליסטוק והסביבה.',
  },
];

const waysToHelp = [
  {
    icon: <VolunteerActivismIcon sx={{ fontSize: 28 }} />,
    title: 'התנדבות',
    description: 'תנו מזמנכם וסייעו בפעילויות הארגון — מארגנות אירועים ועד ליווי קשישים.',
  },
  {
    icon: <FavoriteIcon sx={{ fontSize: 28 }} />,
    title: 'תרומה',
    description: 'ניתן לתרום לעמותה באמצעות פנייה ישירה לארגון בדוא"ל או בטלפון.',
  },
];

const faq = [
  {
    q: 'מי יכול להצטרף?',
    a: 'כל מי שמרגיש קשר לקהילת ביאליסטוק — יוצאי העיר, צאצאיהם, ומי שמעוניין לסייע בהנצחת המורשת.',
  },
  {
    q: 'האם יש דמי חברות?',
    a: 'לפרטים על דמי חברות ותנאי הצטרפות, צרו קשר עם הארגון.',
  },
  {
    q: 'כיצד אפשר לתרום?',
    a: 'ניתן לתרום לעמותה באמצעות פנייה ישירה לארגון בדוא"ל או בטלפון.',
  },
  {
    q: 'אילו אירועים מתקיימים?',
    a: 'הארגון מקיים טכסי אזכרה שנתיים, כנסים, מפגשים קהילתיים ופעילויות הנצחה ומורשת בהיכל ביאליסטוק.',
  },
];

export default function MembershipPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <PageHeader title="הצטרפו אלינו" subtitle="הפכו לחלק ממשפחת ביאליסטוק" />

      {/* Benefits */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader title="למה להצטרף?" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-100 mb-4 text-accent-700">
                  {b.icon}
                </div>
                <h3 className="text-heading-sm font-semibold text-primary-900">{b.title}</h3>
                <p className="mt-2 text-body-md text-neutral-500">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to Help */}
      <section className="py-16 md:py-24 bg-primary-900">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-display-lg text-white font-bold">איך אפשר לעזור?</h2>
            <div className="mt-4 mx-auto w-15 h-[3px] bg-accent-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {waysToHelp.map((w) => (
              <div key={w.title} className="bg-white/10 rounded-xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent-500/20 mb-4 text-accent-300">
                  {w.icon}
                </div>
                <h3 className="text-heading-sm font-semibold text-white">{w.title}</h3>
                <p className="mt-2 text-body-md text-white/80">{w.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 md:py-24 bg-neutral-100">
        <div className="mx-auto max-w-xl px-4 lg:px-8">
          <SectionHeader title="טופס הצטרפות" />
          {submitted ? (
            <div className="bg-primary-100 rounded-xl p-8 text-center">
              <p className="text-heading-md font-semibold text-primary-900">תודה!</p>
              <p className="mt-2 text-body-md text-neutral-500">פנייתכם התקבלה, ניצור קשר בהקדם.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-xl shadow-sm">
              <TextField label="שם מלא" name="name" required />
              <TextField label='דוא"ל' name="email" type="email" required />
              <TextField label="טלפון" name="phone" />
              <TextField label="הודעה" name="message" multiline rows={3} />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                fullWidth
                sx={{ fontWeight: 600 }}
              >
                שלחו בקשת הצטרפות
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <SectionHeader title="שאלות נפוצות" />
          {faq.map((item) => (
            <Accordion key={item.q} sx={{ mb: 1, borderRadius: 2, '&:before': { display: 'none' } }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <span className="font-semibold text-primary-900">{item.q}</span>
              </AccordionSummary>
              <AccordionDetails>
                <p className="text-neutral-500">{item.a}</p>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </section>
    </>
  );
}
