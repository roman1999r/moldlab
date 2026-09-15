import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';

export default function ForgotPassword() {
    const { t } = useLanguage();

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        setMessage('');
        setSuccess(false);

        if (!email.trim()) {
            setMessage(t.auth.enterEmail);
            return;
        }

        if (!supabase) {
            setMessage(t.auth.error);
            return;
        }

        setLoading(true);

        try {
            /*
             * IMPORTANT:
             * We return to the normal URL, not HashRouter route.
             *
             * Supabase PKCE will add:
             * ?code=...
             */
            const redirectTo =
                `${window.location.origin}${window.location.pathname}`;

            const { error } =
                await supabase.auth.resetPasswordForEmail(
                    email.trim(),
                    {
                        redirectTo,
                    }
                );

            if (error) {
                throw error;
            }

            setSuccess(true);

            setMessage(t.auth.resetEmailSent);
        } catch (error) {
            console.error(
                'FORGOT PASSWORD ERROR:',
                error
            );

            setMessage(t.auth.error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="page">
            <div className="container auth">
                <form
                    className="auth-card"
                    onSubmit={handleSubmit}
                >
                    <span className="eyebrow">
                        MOLDLAB ACCOUNT
                    </span>

                    <h1>
                        {t.auth.forgotPassword}
                    </h1>

                    {!success && (
                        <>
                            <input
                                required
                                type="email"
                                placeholder={t.auth.email}
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
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
                                    ? t.auth.loading
                                    : t.auth.sendResetLink}
                            </button>
                        </>
                    )}

                    {success && (
                        <div className="notice">
                            {message}
                        </div>
                    )}

                    <Link
                        to="/login"
                        className="button full"
                    >
                        {t.auth.backToLogin}
                    </Link>
                </form>
            </div>
        </main>
    );
}