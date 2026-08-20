export const demoProducts = [
  { id: 'rose', name: 'Rose', nameUk: 'Троянда', namePl: 'Róża', nameEn: 'Rose', category: 'Квіти', categoryPl: 'Kwiaty', categoryEn: 'Flowers', price: 24, oldPrice: 29, description: 'Елегантна форма для шоколадних троянд із детальним рельєфом пелюсток.', descriptionPl: 'Elegancka forma do czekoladowych róż z detalicznym reliefem płatków.', descriptionEn: 'An elegant mold for chocolate roses with detailed petal relief.', size: '78 × 78 × 32 мм', cells: 6, image: '/images/rose.jpg', model: '/models/rose.glb', featured: true },
  { id: 'heart', name: 'Heart', nameUk: 'Серце', namePl: 'Serce', nameEn: 'Heart', category: 'Фігурки', categoryPl: 'Figurki', categoryEn: 'Figures', price: 19, description: 'Класична форма серця для шоколаду, праліне та десертів.', descriptionPl: 'Klasyczna forma serca do czekolady, pralin i deserów.', descriptionEn: 'A classic heart mold for chocolate, pralines and desserts.', size: '55 × 50 × 25 мм', cells: 8, image: '/images/heart.jpg', model: '/models/heart.glb', featured: true },
  { id: 'classic-bar', name: 'Classic Bar', nameUk: 'Класична плитка', namePl: 'Klasyczna tabliczka', nameEn: 'Classic Bar', category: 'Плитки', categoryPl: 'Tabliczki', categoryEn: 'Bars', price: 28, description: 'Форма для авторської шоколадної плитки з глибоким рельєфом.', descriptionPl: 'Forma do autorskiej tabliczki czekolady z głębokim reliefem.', descriptionEn: 'A mold for an original chocolate bar with a deep relief.', size: '120 × 60 × 10 мм', cells: 1, image: '/images/bar.jpg', model: '/models/bar.glb', featured: true },
  { id: 'star', name: 'Star', nameUk: 'Зірка', namePl: 'Gwiazdka', nameEn: 'Star', category: 'Свята', categoryPl: 'Święta', categoryEn: 'Festive', price: 21, description: 'Святкові шоколадні зірки для подарункових наборів.', descriptionPl: 'Świąteczne czekoladowe gwiazdki do zestawów prezentowych.', descriptionEn: 'Festive chocolate stars for gift sets.', size: '52 × 52 × 20 мм', cells: 10, image: '/images/star.jpg', model: '/models/star.glb' },
];
export const categories = ['Всі', 'Квіти', 'Фігурки', 'Плитки', 'Свята'];
export function normalizeProduct(p) {
  return { ...p, oldPrice: p.old_price ?? p.oldPrice, image: p.image_url ?? p.image, model: p.model_url ?? p.model };
}
export function localizeProduct(product, language) {
  const p = normalizeProduct(product);
  const map = language === 'pl' ? { name: p.namePl || p.name, description: p.descriptionPl || p.description, category: p.categoryPl || p.category } : language === 'en' ? { name: p.nameEn || p.name, description: p.descriptionEn || p.description, category: p.categoryEn || p.category } : { name: p.nameUk || p.name, description: p.description, category: p.category };
  return { ...p, ...map, originalCategory: p.category };
}
