import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';

export default function ResetPassword() {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [checkingSession, setCheckingSession] = useState(true);

    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let mounted = true;

        async function prepareRecoverySession() {
            try {
                const params = new URLSearchParams(
                    window.location.search
                );

                const code = params.get('code');

                if (!code) {
                    if (mounted) {
                        setMessage(t.auth.invalidResetLink);
                        setCheckingSession(false);
                    }

                    return;
                }

                const { error } =
                    await supabase.auth.exchangeCodeForSession(code);

                if (error) {
                    console.error(
                        'RECOVERY CODE ERROR:',
                        error
                    );

                    if (mounted) {
                        setMessage(t.auth.invalidResetLink);
                        setCheckingSession(false);
                    }

                    return;
                }

                window.history.replaceState(
                    {},
                    document.title,
                    `${window.location.pathname}#/reset-password`
                );

                if (mounted) {
                    setReady(true);
                    setCheckingSession(false);
                }
            } catch (error) {
                console.error(
                    'RECOVERY SESSION ERROR:',
                    error
                );

                if (mounted) {
                    setMessage(t.auth.invalidResetLink);
                    setCheckingSession(false);
                }
            }
        }

        prepareRecoverySession();

        return () => {
            mounted = false;
        };
    }, [t]);
    async function handleSubmit(e) {
        e.preventDefault();

        setMessage('');
        setSuccess(false);

        if (password.length < 6) {
            setMessage(t.auth.passwordMinLength);
            return;
        }

        if (password !== confirmPassword) {
            setMessage(t.auth.passwordMismatch);
            return;
        }

        setLoading(true);

        try {
            /*
             * At this point Supabase must have
             * a valid recovery session.
             */
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (!session) {
                setMessage(t.auth.invalidResetLink);
                return;
            }

            const { error } = await supabase.auth.updateUser({
                password,
            });

            if (error) {
                throw error;
            }

            setSuccess(true);
            setMessage(t.auth.passwordUpdated);

            setTimeout(() => {
                navigate('/login', {
                    replace: true,
                });
            }, 1500);
        } catch (error) {
            console.error(
                'RESET PASSWORD ERROR:',
                error
            );

            setMessage(t.auth.error);
        } finally {
            setLoading(false);
        }
    }

    if (checkingSession) {
        return (
            <main className="page">
                <div className="container auth">
                    <div className="auth-card">
                        <div className="notice">
                            {t.auth.loading}
                        </div>
                    </div>
                </div>
            </main>
        );
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

                    <h1>{t.auth.resetPassword}</h1>

                    {!ready && !success && (
                        <>
                            <div className="notice">
                                {message}
                            </div>

                            <Link
                                to="/forgot-password"
                                className="button primary full"
                            >
                                {t.auth.forgotPassword}
                            </Link>
                        </>
                    )}

                    {ready && !success && (
                        <>
                            <input
                                required
                                type="password"
                                minLength={6}
                                placeholder={t.auth.newPassword}
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />

                            <input
                                required
                                type="password"
                                minLength={6}
                                placeholder={t.auth.confirmPassword}
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
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
                                    : t.auth.resetPasswordButton}
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