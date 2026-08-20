import '@google/model-viewer';
import { Box } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ProductModel({ src, poster, large = false }) {
  const { t } = useLanguage();
  return <div className={`model ${large ? 'large' : ''}`}>
    {src ? <model-viewer src={src} poster={poster || undefined} camera-controls auto-rotate rotation-per-second="18deg" interaction-prompt="none" shadow-intensity="1" exposure="1" camera-orbit="0deg 72deg 105%" field-of-view="28deg" alt={t.product.view3d} /> : <div className="model-empty"><Box size={30}/><span>{t.product.noModel}</span></div>}
    {src && <div className="model-hint">↻ {t.product.rotate}</div>}
  </div>;
}
