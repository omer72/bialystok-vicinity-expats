export interface Person {
  slug: string;
  name: string;
  nameEn: string;
  description: string;
}

export const people: Person[] = [
  { slug: 'rabbi-mohilever', name: 'הרב שמואל מוהליבר', nameEn: 'Rabbi Shmuel Mohilever', description: 'מראשוני תנועת חובבי ציון, נולד בשנת 1824 וכיהן כרבה של ביאליסטוק.' },
  { slug: 'dr-zamenhof', name: 'ד"ר לודויג זמנהוף', nameEn: 'Dr. Ludwig Zamenhof', description: 'רופא עיניים יהודי, יליד ביאליסטוק, ממציא שפת אספרנטו.' },
  { slug: 'elazar-sukenik', name: 'פרופסור אלעזר ליפא סוקניק', nameEn: 'Prof. Elazar Sukenik', description: 'ארכיאולוג ישראלי, יליד ביאליסטוק, מגלה מגילות ים המלח.' },
  { slug: 'yosef-chazanovitz', name: 'ד״ר יוסף חזנוביץ', nameEn: 'Dr. Yosef Chazanovitz', description: 'מייסד הספרייה הלאומית בירושלים, יליד ביאליסטוק.' },
  { slug: 'shlomo-kaplansky', name: 'שלמה קפלנסקי', nameEn: 'Shlomo Kaplansky', description: 'פעיל ציוני בולט, מנהיג תנועת פועלי ציון, יליד ביאליסטוק.' },
  { slug: 'mordechai-tenenbaum', name: 'מרדכי טננבוים', nameEn: 'Mordechai Tenenbaum', description: 'מפקד מרד גטו ביאליסטוק, לוחם מחתרת ומתעד.' },
  { slug: 'shmuel-pisar', name: 'שמואל פיזאר', nameEn: 'Shmuel Pisar', description: 'עורך דין בינלאומי, סופר וניצול שואה מביאליסטוק.' },
  { slug: 'yitzhak-shamir', name: 'יצחק שמיר', nameEn: 'Yitzhak Shamir', description: 'ראש ממשלת ישראל, יליד רוז\'ינוי שליד ביאליסטוק.' },
  { slug: 'moshe-chassid', name: 'משה חסיד', nameEn: 'Moshe Chassid', description: 'איש ציבור ופעיל קהילתי מביאליסטוק.' },
  { slug: 'nachum-zemach', name: 'נחום צמח', nameEn: 'Nachum Zemach', description: 'מייסד תיאטרון "הבימה", יליד ביאליסטוק.' },
  { slug: 'yitzhak-melamed', name: 'יצחק מלמד', nameEn: 'Yitzhak Melamed', description: 'איש חינוך ופעיל קהילתי מביאליסטוק.' },
  { slug: 'alpert', name: 'אלפרט', nameEn: 'Alpert', description: 'אישיות בולטת מקהילת ביאליסטוק.' },
];
