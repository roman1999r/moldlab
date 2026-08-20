import { Globe2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  return <label className="language-switcher" aria-label="Language">
    <Globe2 size={15}/>
    <select value={language} onChange={e => setLanguage(e.target.value)}>
      <option value="uk">{t.languages.uk}</option>
      <option value="pl">{t.languages.pl}</option>
      <option value="en">{t.languages.en}</option>
    </select>
  </label>;
}
