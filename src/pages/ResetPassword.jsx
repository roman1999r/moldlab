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

    useEffect(() => {
        let mounted = true;

        async function checkRecoverySession() {
            const {
                data: { session }
            } = await supabase.auth.getSession();

            if (!mounted) return;

            if (!session) {
                setMessage(t.auth.resetEmailSent);
            }

            setCheckingSession(false);
        }

        checkRecoverySession();

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
            const { error } = await supabase.auth.updateUser({
                password
            });

            if (error) {
                throw error;
            }

            setSuccess(true);
            setMessage(t.auth.passwordUpdated);

            setTimeout(() => {
                navigate('/login', { replace: true });
            }, 1500);
        } catch (error) {
            console.error('RESET PASSWORD ERROR:', error);

            setMessage(
                error?.message || t.auth.error
            );
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

                    <h1>
                        {t.auth.resetPassword}
                    </h1>

                    {!success && (
                        <>
                            <input
                                required
                                type="password"
                                placeholder={t.auth.newPassword}
                                minLength={6}
                                value={password}
                                onChange={e =>
                                    setPassword(e.target.value)
                                }
                            />

                            <input
                                required
                                type="password"
                                placeholder={t.auth.confirmPassword}
                                minLength={6}
                                value={confirmPassword}
                                onChange={e =>
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