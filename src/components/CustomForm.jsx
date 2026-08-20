import {useState} from 'react';
import {LoaderCircle, UploadCloud} from 'lucide-react';
import {supabase} from '../lib/supabase';
import {useLanguage} from '../context/LanguageContext';

export default function CustomForm() {
    const {t} = useLanguage();
    const [form, setForm] = useState({
        customer_name: '',
        email: '',
        phone: '',
        description: ''
    });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    async function submit(e) {
        e.preventDefault();
        setMessage('');
        if (!supabase) return setMessage(t.customForm.connect);
        setLoading(true);
        try {
            let file_url = null;
            if (file) {
                if (file.size > 10 * 1024 * 1024) throw new Error(t.customForm.tooLarge);
                const ext = file.name.split('.').pop()?.toLowerCase() || 'bin';
                const path = `${crypto.randomUUID()}.${ext}`;
                const {error: up} = await supabase.storage.from('custom-uploads').upload(path, file, {contentType: file.type || 'application/octet-stream'});
                if (up) throw up;
                file_url = supabase.storage.from('custom-uploads').getPublicUrl(path).data.publicUrl;
            }
            const {
                data,
                error
            } = await supabase.from('custom_orders').insert({
                ...form,
                file_url,
                status: 'new'
            }).select('id').single();
            if (error) throw error;
            // await supabase.functions.invoke('notify-custom-order', {body: {order_id: data.id}}).catch(() => null);\
            const notification = await supabase.functions.invoke('notify-custom-order', {body: {order_id: data.id}});
            if (notification.error) console.error('Telegram notification failed:', notification.error);
            setForm({customer_name: '', email: '', phone: '', description: ''});
            setFile(null);
            setMessage(t.customForm.success);
        } catch (e) {
            setMessage(e.message || t.customForm.error)
        } finally {
            setLoading(false)
        }
    }

    return <form
        className="custom-form"
        onSubmit={submit}
    >
        <h3>{t.customForm.title}</h3>
        <input
            required
            placeholder={t.customForm.name}
            value={form.customer_name}
            onChange={e => setForm({...form, customer_name: e.target.value})}
        />
        <div className="form-row"><input
            required
            type="email"
            placeholder={t.customForm.email}
            value={form.email}
            onChange={e => setForm({
                ...form,
                email: e.target.value
            })}
        /><input
            required
            placeholder={t.customForm.phone}
            value={form.phone}
            onChange={e => setForm({...form, phone: e.target.value})}
        /></div>
        <textarea
            required
            placeholder={t.customForm.description}
            value={form.description}
            onChange={e => setForm({
                ...form,
                description: e.target.value
            })}
        /><label className="file-input"><UploadCloud size={18} /><span>{file ? file.name : t.customForm.file}</span><input
        type="file"
        accept="image/*,.svg,.stl,.obj,.glb,.pdf"
        onChange={e => setFile(e.target.files?.[0] || null)}
    /></label>{message && <div className="notice">{message}</div>}
        <button
            className="button primary full"
            disabled={loading}
        >{loading ? <LoaderCircle
            className="spin"
            size={18}
        /> : t.customForm.submit}</button>
    </form>;
}
