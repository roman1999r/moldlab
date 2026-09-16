import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { supabase } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';

export default function ResetPassword() {
    const navigate = useNavigate();
    const { language } = useLanguage();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        let mounted = true;

        async function checkRecoverySession() {
            try {
                const {
                    data: { session },
                    error: sessionError,
                } = await supabase.auth.getSession();

                if (sessionError) {
                    throw sessionError;
                }

                if (!session) {
                    throw new Error('Recovery session not found');
                }

                if (mounted) {
                    setLoading(false);
                }
            } catch (err) {
                console.error('PASSWORD RECOVERY SESSION ERROR:', err);

                if (mounted) {
                    setError(
                        language === 'uk'
                            ? 'Посилання для відновлення пароля недійсне або вже використане.'
                            : language === 'pl'
                                ? 'Link do resetowania hasła jest nieprawidłowy lub został już użyty.'
                                : 'The password reset link is invalid or has already been used.'
                    );

                    setLoading(false);
                }
            }
        }

        /*
         * Даємо Supabase трохи часу обробити
         * recovery URL та створити session.
         */
        const timer = setTimeout(() => {
            checkRecoverySession();
        }, 300);

        return () => {
            mounted = false;
            clearTimeout(timer);
        };
    }, [language]);

    async function handleSubmit(e) {
        e.preventDefault();

        setError('');

        if (password.length < 6) {
            setError(
                language === 'uk'
                    ? 'Пароль має містити щонайменше 6 символів.'
                    : language === 'pl'
                        ? 'Hasło musi mieć co najmniej 6 znaków.'
                        : 'Password must be at least 6 characters.'
            );
            return;
        }

        if (password !== confirmPassword) {
            setError(
                language === 'uk'
                    ? 'Паролі не збігаються.'
                    : language === 'pl'
                        ? 'Hasła nie są takie same.'
                        : 'Passwords do not match.'
            );
            return;
        }

        setSaving(true);

        try {
            const { error: updateError } =
                await supabase.auth.updateUser({
                    password,
                });

            if (updateError) {
                throw updateError;
            }

            /*
             * Важливо:
             * після зміни пароля виходимо з recovery session,
             * щоб користувач не залишався залогіненим.
             */
            await supabase.auth.signOut();

            // if (mounted) {
            //     setSuccess(true);
            // }

            setTimeout(() => {
                navigate('/login', { replace: true });
            }, 1200);
        } catch (err) {
            console.error('PASSWORD UPDATE ERROR:', err);

            setError(
                language === 'uk'
                    ? 'Не вдалося змінити пароль.'
                    : language === 'pl'
                        ? 'Nie udało się zmienić hasła.'
                        : 'Failed to update password.'
            );
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <main className="section">
                <div className="container">
                    <div className="auth-page">
                        <div className="auth-card">
                            <p>
                                {language === 'uk'
                                    ? 'Перевіряємо посилання...'
                                    : language === 'pl'
                                        ? 'Sprawdzanie linku...'
                                        : 'Checking link...'}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (error && !success) {
        return (
            <main className="section">
                <div className="container">
                    <div className="auth-page">
                        <div className="auth-card">
                            <h1>
                                {language === 'uk'
                                    ? 'Відновлення пароля'
                                    : language === 'pl'
                                        ? 'Resetowanie hasła'
                                        : 'Password reset'}
                            </h1>

                            <p className="auth-error">
                                {error}
                            </p>

                            <button
                                type="button"
                                className="auth-submit"
                                onClick={() =>
                                    navigate('/forgot-password')
                                }
                            >
                                {language === 'uk'
                                    ? 'Запросити нове посилання'
                                    : language === 'pl'
                                        ? 'Poproś o nowy link'
                                        : 'Request a new link'}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="section">
            <div className="container">
                <div className="auth-page">
                    <div className="auth-card">
                        <h1>
                            {language === 'uk'
                                ? 'Новий пароль'
                                : language === 'pl'
                                    ? 'Nowe hasło'
                                    : 'New password'}
                        </h1>

                        {success ? (
                            <p className="auth-success">
                                {language === 'uk'
                                    ? 'Пароль змінено. Перенаправляємо на вхід...'
                                    : language === 'pl'
                                        ? 'Hasło zostało zmienione. Przekierowanie...'
                                        : 'Password changed. Redirecting...'}
                            </p>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <label>
                                    {language === 'uk'
                                        ? 'Новий пароль'
                                        : language === 'pl'
                                            ? 'Nowe hasło'
                                            : 'New password'}

                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        autoComplete="new-password"
                                        required
                                    />
                                </label>

                                <label>
                                    {language === 'uk'
                                        ? 'Повторіть пароль'
                                        : language === 'pl'
                                            ? 'Powtórz hasło'
                                            : 'Confirm password'}

                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                        autoComplete="new-password"
                                        required
                                    />
                                </label>

                                {error && (
                                    <p className="auth-error">
                                        {error}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    className="auth-submit"
                                    disabled={saving}
                                >
                                    {saving
                                        ? language === 'uk'
                                            ? 'Збереження...'
                                            : language === 'pl'
                                                ? 'Zapisywanie...'
                                                : 'Saving...'
                                        : language === 'uk'
                                            ? 'Змінити пароль'
                                            : language === 'pl'
                                                ? 'Zmień hasło'
                                                : 'Change password'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}