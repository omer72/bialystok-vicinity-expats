export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  images?: string[];
  imageDisplayMode?: 'grid' | 'carousel';
}

export const blogPosts: BlogPost[] = [
  { slug: 'yosef-makovsky', title: 'יוסף מקובסקי', excerpt: 'סיפור חייו של יוסף מקובסקי שניצל ע"י קפיצה מהרכבת לאושוויץ.', date: '14 בינואר 2023', image: 'be8555_ecd0f088da0d4049b9102271435c6172_mv2.jpg' },
  { slug: 'michael-flicker', title: 'מיכאל פליקר', excerpt: 'סיפורו של מיכאל פליקר מביאליסטוק.', date: '2023', image: 'be8555_8b6db395e34e4394a5ffecef3f273e4f_mv2.jpg' },
  { slug: 'eva-kartzovska', title: 'אווה קרצובסקה', excerpt: 'סיפורה של אווה קרצובסקה מביאליסטוק.', date: '2023', image: 'be8555_08bd169cf6824e10b4420477cb85e775_mv2.jpg' },
  { slug: 'shraga-feivel', title: 'שרגא פייבל כגן', excerpt: 'סיפורו של שרגא פייבל כגן מביאליסטוק.', date: '2023', image: 'be8555_40aa48169e654fcb85bffcc1bd6d0dd3_mv2.jpg' },
  { slug: 'children-of-bialystok', title: 'ילדי ביאליסטוק', excerpt: 'סיפורם של ילדי ביאליסטוק בתקופת השואה.', date: '2023', image: 'be8555_65d63e2d89f0471c8137cbf06fc41605_mv2.jpg' },
  { slug: 'shamai-kizelstein', title: 'שמאי קיזילשטיין', excerpt: 'סיפורו של שמאי קיזילשטיין מביאליסטוק.', date: '2023', image: 'be8555_2cb64a661bf74bde8f96686996fd38d0_mv2.jpg' },
  { slug: 'eliash-baumatz', title: 'אליאש באומץ', excerpt: 'סיפורו של אליאש באומץ מביאליסטוק.', date: '2023', image: 'be8555_6cfc4322b9b04a3fbd351339a37ca9b2_mv2.jpg' },
  { slug: 'ruth-maltzman', title: 'רות מלצמן', excerpt: 'סיפורה של רות מלצמן מביאליסטוק.', date: '2023', image: 'be8555_174391927da742b3a3a4f17cecf0f01e_mv2.jpg' },
  { slug: 'mordechai-danin', title: 'הסופר מרדכי דנין', excerpt: 'מספר כתבות על ביאליסטוק שפירסם הסופר מרדכי דנין בעיתון "פארווערטס".', date: '2023', image: 'be8555_ab182d7967354d90a30c308e7cfebebe_mv2.jpg' },
  { slug: 'simcha-london', title: 'שמחה לונדון', excerpt: 'סיפורו של שמחה לונדון מביאליסטוק.', date: '2023', image: 'be8555_b7760b45faf84d47b6262421a22348c5_mv2.jpg' },
  { slug: 'yaakov-makovsky', title: 'יעקוב מקובסקי', excerpt: 'סיפורו של יעקוב מקובסקי מביאליסטוק.', date: '2023', image: 'be8555_9834a41c1a624d43b62564dfbc8b189c_mv2.jpg' },
  { slug: 'ari-avraham', title: 'ארי אברהם', excerpt: 'סיפורו של ארי אברהם מביאליסטוק.', date: '2023', image: 'be8555_3dae29f6d6f747378b1101a962084d75_mv2.jpg' },
  { slug: 'pinchas-natan-adler', title: 'פנחס ונתן אדלר', excerpt: 'סיפורם של פנחס ונתן אדלר מביאליסטוק.', date: '2023', image: 'be8555_49e7ff10aa59402ab5c46f788c93e685_mv2.jpg' },
  { slug: 'mina-kizelstein-doron', title: 'מינה קיזלשטיין-דורון', excerpt: 'סיפורה של מינה קיזלשטיין-דורון מביאליסטוק.', date: '2023', image: 'be8555_bb3448d7d1d1413e86470536e3326022_mv2.jpg' },
  { slug: 'natan-adler', title: 'נתן אדלר', excerpt: 'סיפורו של נתן אדלר מביאליסטוק.', date: '2023', image: 'be8555_30175246b34d4f5fbb8926acd3c9c429_mv2.jpg' },
  { slug: 'zeev-balgli', title: 'זאב בלגלי', excerpt: 'סיפורו של זאב בלגלי מביאליסטוק.', date: '2023', image: 'be8555_e4947d15fc6846cd896c6ee44dec50ad_mv2.png' },
  { slug: 'yitzhak-broida', title: 'יצחק ברוידה', excerpt: 'סיפורו של יצחק ברוידה מביאליסטוק.', date: '2023', image: 'be8555_71a366cb4e894b75970e52f33cbb5d41_mv2.jpg' },
];
