// import { useState } from 'react';
// import { supabase } from '../lib/supabase';
// import { useNavigate } from 'react-router-dom';
//
// export default function Auth() {
//     const navigate = useNavigate();
//
//     const [mode, setMode] = useState('login');
//
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [name, setName] = useState('');
//
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState('');
//
//     async function submit(e) {
//         e.preventDefault();
//
//         setLoading(true);
//         setMessage('');
//
//         try {
//             if (mode === 'register') {
//                 const { data, error } = await supabase.auth.signUp({
//                     email,
//                     password,
//                     options: {
//                         data: {
//                             full_name: name
//                         }
//                     }
//                 });
//
//                 if (error) throw error;
//
//                 if (!data.session) {
//                     setMessage(
//                         'Реєстрація успішна. Перевірте email для підтвердження.'
//                     );
//                 } else {
//                     navigate('/');
//                 }
//             } else {
//                 const { error } = await supabase.auth.signInWithPassword({
//                     email,
//                     password
//                 });
//
//                 if (error) throw error;
//
//                 navigate('/');
//             }
//         } catch (error) {
//             console.error(error);
//             setMessage(error.message);
//         } finally {
//             setLoading(false);
//         }
//     }
//
//     return (
//         <div className="auth-page">
//             <form className="auth-form" onSubmit={submit}>
//
//                 <h1>
//                     {mode === 'login'
//                         ? 'Вхід'
//                         : 'Створити акаунт'}
//                 </h1>
//
//                 {mode === 'register' && (
//                     <input
//                         required
//                         placeholder="Ваше ім'я"
//                         value={name}
//                         onChange={e => setName(e.target.value)}
//                     />
//                 )}
//
//                 <input
//                     required
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={e => setEmail(e.target.value)}
//                 />
//
//                 <input
//                     required
//                     type="password"
//                     placeholder="Пароль"
//                     minLength={6}
//                     value={password}
//                     onChange={e => setPassword(e.target.value)}
//                 />
//
//                 {message && (
//                     <div className="notice">
//                         {message}
//                     </div>
//                 )}
//
//                 <button
//                     className="button primary full"
//                     disabled={loading}
//                 >
//                     {loading
//                         ? 'Завантаження...'
//                         : mode === 'login'
//                             ? 'Увійти'
//                             : 'Зареєструватися'}
//                 </button>
//
//                 <button
//                     type="button"
//                     className="button"
//                     onClick={() =>
//                         setMode(
//                             mode === 'login'
//                                 ? 'register'
//                                 : 'login'
//                         )
//                     }
//                 >
//                     {mode === 'login'
//                         ? 'Створити акаунт'
//                         : 'У мене вже є акаунт'}
//                 </button>
//
//             </form>
//         </div>
//     );
// }


import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Auth() {
    const navigate = useNavigate();

    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    async function submit(e) {
        e.preventDefault();

        if (!supabase) {
            setMessage('Supabase не налаштований.');
            return;
        }

        setLoading(true);
        setMessage('');
        setSuccess(false);

        try {
            if (mode === 'register') {
                const { data, error } = await supabase.auth.signUp({
                    email: email.trim(),
                    password,
                    options: {
                        data: {
                            full_name: name.trim()
                        }
                    }
                });

                if (error) throw error;

                if (!data.session) {
                    setSuccess(true);
                    setMessage(
                        'Акаунт створено. Перевірте вашу електронну пошту для підтвердження.'
                    );
                } else {
                    navigate('/account');
                }
            } else {
                const { error } =
                    await supabase.auth.signInWithPassword({
                        email: email.trim(),
                        password
                    });

                if (error) throw error;

                navigate('/account');
            }
        } catch (error) {
            console.error('AUTH ERROR:', error);
            setMessage(error.message || 'Сталася помилка.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="auth-page">
            <div className="auth-card">

                <Link to="/" className="auth-back">
                    ← На головну
                </Link>

                <div className="auth-logo">
                    <div className="logo-mark">M</div>
                    <strong>MoldLab</strong>
                </div>

                <h1>
                    {mode === 'login'
                        ? 'Вітаємо знову'
                        : 'Створити акаунт'}
                </h1>

                <p className="auth-subtitle">
                    {mode === 'login'
                        ? 'Увійдіть до свого акаунта'
                        : 'Зареєструйтеся, щоб зберігати замовлення та обрані товари'}
                </p>

                <form onSubmit={submit}>

                    {mode === 'register' && (
                        <label>
                            <span>Ваше ім'я</span>

                            <input
                                required
                                type="text"
                                placeholder="Ім'я"
                                value={name}
                                onChange={e =>
                                    setName(e.target.value)
                                }
                            />
                        </label>
                    )}

                    <label>
                        <span>Email</span>

                        <input
                            required
                            type="email"
                            placeholder="example@email.com"
                            value={email}
                            onChange={e =>
                                setEmail(e.target.value)
                            }
                        />
                    </label>

                    <label>
                        <span>Пароль</span>

                        <input
                            required
                            type="password"
                            minLength={6}
                            placeholder="Мінімум 6 символів"
                            value={password}
                            onChange={e =>
                                setPassword(e.target.value)
                            }
                        />
                    </label>

                    {message && (
                        <div
                            className={`notice ${
                                success ? 'notice-success' : ''
                            }`}
                        >
                            {message}
                        </div>
                    )}

                    <button
                        className="button primary full"
                        disabled={loading}
                    >
                        {loading
                            ? 'Завантаження...'
                            : mode === 'login'
                                ? 'Увійти'
                                : 'Зареєструватися'}
                    </button>

                </form>

                <div className="auth-switch">
                    {mode === 'login'
                        ? 'Ще немає акаунта?'
                        : 'Вже маєте акаунт?'}

                    <button
                        type="button"
                        onClick={() => {
                            setMode(
                                mode === 'login'
                                    ? 'register'
                                    : 'login'
                            );

                            setMessage('');
                            setSuccess(false);
                        }}
                    >
                        {mode === 'login'
                            ? 'Зареєструватися'
                            : 'Увійти'}
                    </button>
                </div>

            </div>
        </main>
    );
}