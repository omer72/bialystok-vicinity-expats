'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PageHeader from '@/components/PageHeader';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <PageHeader title="צור קשר" subtitle="דרכי יצירת קשר עם הארגון" />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-heading-lg font-bold text-primary-900 mb-6">פרטי התקשרות</h2>
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <PlaceIcon className="text-accent-500 mt-1" />
                  <div>
                    <p className="text-body-md font-semibold text-neutral-900">כתובת</p>
                    <p className="text-body-md text-neutral-500">טננבוים 17, יהוד-מונוסון, ישראל 5621108</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <PhoneIcon className="text-accent-500 mt-1" />
                  <div>
                    <p className="text-body-md font-semibold text-neutral-900">טלפון</p>
                    <p className="text-body-md text-neutral-500" dir="ltr">03-5360037, 054-9932329</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <EmailIcon className="text-accent-500 mt-1" />
                  <div>
                    <p className="text-body-md font-semibold text-neutral-900">דוא&quot;ל</p>
                    <a
                      href="mailto:bialystok.israel@gmail.com"
                      className="text-body-md text-primary-700 hover:text-primary-900 transition-colors"
                    >
                      bialystok.israel@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <AccessTimeIcon className="text-accent-500 mt-1" />
                  <div>
                    <p className="text-body-md font-semibold text-neutral-900">שעות פעילות</p>
                    <p className="text-body-md text-neutral-500">ימים א&apos;-ה&apos; בבקרים (מועדון קשישים)</p>
                    <p className="text-body-md text-neutral-500">אירועים ופעילויות — לפי תיאום מראש</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-heading-lg font-bold text-primary-900 mb-6">שלחו הודעה</h2>
              {submitted ? (
                <div className="bg-primary-100 rounded-xl p-8 text-center">
                  <p className="text-heading-md font-semibold text-primary-900">תודה ששלחתם!</p>
                  <p className="mt-2 text-body-md text-neutral-500">נחזור אליכם בהקדם.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <TextField label="שם" name="name" required />
                  <TextField label='דוא"ל' name="email" type="email" required />
                  <TextField label="טלפון" name="phone" />
                  <TextField label="נושא" name="subject" required />
                  <TextField label="הודעה" name="message" multiline rows={4} required />
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{ fontWeight: 600 }}
                  >
                    שלח
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Embed */}
      <section className="w-full">
        <iframe
          title="מפת מיקום הארגון — טננבוים 17, יהוד-מונוסון"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3383.5!2d34.8875!3d32.0325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d3610c16be42d%3A0x6c9f2fd2a8e4ae7!2sYehud-Monosson!5e0!3m2!1she!2sil!4v1700000000000"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}
