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
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const navigate = useNavigate();

    const [mode, setMode] = useState('login');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    async function submit(e) {
        e.preventDefault();

        setLoading(true);
        setMessage('');

        try {
            if (mode === 'register') {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: name
                        }
                    }
                });

                if (error) throw error;

                if (!data.session) {
                    setMessage(
                        'Реєстрація успішна. Перевірте email для підтвердження.'
                    );
                } else {
                    navigate('/account', { replace: true });
                }
            } else {
                const { data, error } =
                    await supabase.auth.signInWithPassword({
                        email,
                        password
                    });

                if (error) throw error;

                const user = data.user;
                console.log(user);

                if (!user) {
                    throw new Error('Не вдалося отримати користувача.');
                }

                // Перевіряємо роль
                const { data: profile, error: profileError } =
                    await supabase
                        .from('profiles')
                        .select('role')
                        .eq('id', user.id)
                        .single();
                console.log(profile);

                if (profileError) {
                    console.error('PROFILE ERROR:', profileError);

                    // Якщо профілю немає — звичайний користувач
                    navigate('/account', { replace: true });
                    return;
                }

                if (profile?.role === 'admin') {
                    navigate('/admin', { replace: true });
                    console.log(123)
                } else {
                    navigate('/account', { replace: true });
                }



            }} catch (error) {
            console.error('AUTH ERROR:', error);
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="page">
            <div className="container auth">

                <form
                    className="auth-card"
                    onSubmit={submit}
                >
                    <span className="eyebrow">
                        MOLDLAB ACCOUNT
                    </span>

                    <h1>
                        {mode === 'login'
                            ? 'Вхід'
                            : 'Створити акаунт'}
                    </h1>

                    {mode === 'register' && (
                        <input
                            required
                            type="text"
                            placeholder="Ваше ім'я"
                            value={name}
                            onChange={e =>
                                setName(e.target.value)
                            }
                        />
                    )}

                    <input
                        required
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        required
                        type="password"
                        placeholder="Пароль"
                        minLength={6}
                        value={password}
                        onChange={e =>
                            setPassword(e.target.value)
                        }
                    />

                    {message && (
                        <div className="notice">
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="button primary full"
                        disabled={loading}
                    >
                        {loading
                            ? 'Завантаження...'
                            : mode === 'login'
                                ? 'Увійти'
                                : 'Зареєструватися'}
                    </button>

                    <button
                        type="button"
                        className="button full"
                        onClick={() =>
                            setMode(
                                mode === 'login'
                                    ? 'register'
                                    : 'login'
                            )
                        }
                    >
                        {mode === 'login'
                            ? 'Створити акаунт'
                            : 'У мене вже є акаунт'}
                    </button>

                </form>

            </div>
        </main>
    );
}