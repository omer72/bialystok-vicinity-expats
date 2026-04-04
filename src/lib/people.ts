export interface Person {
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  image?: string;
  contentSlug?: string;
}

export const people: Person[] = [
  {
    slug: 'rabbi-mohilever',
    name: 'הרב שמואל מוהליבר',
    nameEn: 'Rabbi Shmuel Mohilever',
    description: 'מראשוני תנועת חובבי ציון, נולד בשנת 1824 וכיהן כרבה של ביאליסטוק.',
    image: '/images/5eeb4e_050657135b1f4d9098a00a8a74f3fac3_mv2.jpg',
    contentSlug: 'rabbi-mohilever',
  },
  {
    slug: 'dr-zamenhof',
    name: 'ד"ר לודויג זמנהוף',
    nameEn: 'Dr. Ludwig Zamenhof',
    description: 'רופא עיניים יהודי, יליד ביאליסטוק, ממציא שפת אספרנטו.',
    image: '/images/5eeb4e_177612c7d8d0435a868c3ebd6215de6c_mv2.jpg',
    contentSlug: 'dr-zamenhof',
  },
  {
    slug: 'elazar-sukenik',
    name: 'פרופסור אלעזר ליפא סוקניק',
    nameEn: 'Prof. Elazar Sukenik',
    description: 'ארכיאולוג ישראלי, יליד ביאליסטוק, מגלה מגילות ים המלח.',
    image: '/images/15df41_e90cdac3e1354ad4a21be00a11d73e6a_mv2.jpg',
    contentSlug: 'elazar-sukenik',
  },
  {
    slug: 'yosef-chazanovitz',
    name: 'ד״ר יוסף חזנוביץ',
    nameEn: 'Dr. Yosef Chazanovitz',
    description: 'מייסד הספרייה הלאומית בירושלים, יליד ביאליסטוק.',
    image: '/images/15df41_3bb275d0c0ef4793ad80966f3871f466_mv2.jpeg',
    contentSlug: 'yosef-chazanovitz',
  },
  {
    slug: 'shlomo-kaplansky',
    name: 'שלמה קפלנסקי',
    nameEn: 'Shlomo Kaplansky',
    description: 'פעיל ציוני בולט, מנהיג תנועת פועלי ציון, יליד ביאליסטוק.',
    image: '/images/15df41_2f35bb2dde714b37973824e7d8a14e20_mv2.jpg',
    contentSlug: 'shlomo-kaplansky',
  },
  {
    slug: 'mordechai-tenenbaum',
    name: 'מרדכי טננבוים',
    nameEn: 'Mordechai Tenenbaum',
    description: 'מפקד מרד גטו ביאליסטוק, לוחם מחתרת ומתעד.',
    image: '/images/5eeb4e_b884d8e71b15453c97efe73809e5ea21_mv2.jpg',
    contentSlug: 'mordechai-tenenbaum',
  },
  {
    slug: 'shmuel-pisar',
    name: 'שמואל פיזאר',
    nameEn: 'Shmuel Pisar',
    description: 'עורך דין בינלאומי, סופר וניצול שואה מביאליסטוק.',
    image: '/images/5eeb4e_a79b588ea2d64e06859c26f2a4bb6be9_mv2.jpg',
    contentSlug: 'shmuel-pisar',
  },
  {
    slug: 'yitzhak-shamir',
    name: 'יצחק שמיר',
    nameEn: 'Yitzhak Shamir',
    description: 'ראש ממשלת ישראל, יליד רוז\'ינוי שליד ביאליסטוק.',
    image: '/images/5eeb4e_e341873fc18f48a58a10590da15a481a_mv2.jpg',
    contentSlug: 'yitzhak-shamir',
  },
  {
    slug: 'moshe-chassid',
    name: 'משה חסיד',
    nameEn: 'Moshe Chassid',
    description: 'איש ציבור ופעיל קהילתי מביאליסטוק.',
    image: '/images/5eeb4e_c0eabcb3c0424ffd925afddcbd1f3594_mv2.jpg',
    contentSlug: 'moshe-chassid',
  },
  {
    slug: 'nachum-zemach',
    name: 'נחום צמח',
    nameEn: 'Nachum Zemach',
    description: 'מייסד תיאטרון "הבימה", יליד ביאליסטוק.',
    image: '/images/5eeb4e_dd938f6c1df84c638e74a745700514f1_mv2.png',
    contentSlug: 'nachum-zemach',
  },
  {
    slug: 'yitzhak-melamed',
    name: 'יצחק מלמד',
    nameEn: 'Yitzhak Melamed',
    description: 'איש חינוך ופעיל קהילתי מביאליסטוק.',
    contentSlug: 'yitzhak-melamed',
  },
  {
    slug: 'alpert',
    name: 'אלפרט',
    nameEn: 'Alpert',
    description: 'אישיות בולטת מקהילת ביאליסטוק.',
    contentSlug: 'sukenik-copy',
  },
];
