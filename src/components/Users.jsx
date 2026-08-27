import { useEffect, useState } from 'react';
import { Search, Shield, User } from 'lucide-react';
import { supabase } from '../lib/supabase.js';

export default function Users() {
    const [users, setUsers] =
        useState([]);

    const [search, setSearch] =
        useState('');

    const [loading, setLoading] =
        useState(true);

    const [message, setMessage] =
        useState('');

    async function loadUsers() {
        setLoading(true);

        const {
            data,
            error
        } = await supabase
            .from('profiles')
            .select('*')
            .order(
                'created_at',
                { ascending: false }
            );

        if (error) {
            console.error(error);
            setMessage(error.message);
        } else {
            setUsers(data || []);
        }

        setLoading(false);
    }

    useEffect(() => {
        loadUsers();
    }, []);

    async function changeRole(
        id,
        role
    ) {
        setMessage('');

        const {
            error
        } = await supabase
            .from('profiles')
            .update({ role })
            .eq('id', id);

        if (error) {
            setMessage(error.message);
            return;
        }

        setUsers(current =>
            current.map(user =>
                user.id === id
                    ? {
                        ...user,
                        role
                    }
                    : user
            )
        );
    }

    const filtered =
        users.filter(user => {
            const value =
                `${user.full_name || ''} ${user.email || ''}`
                    .toLowerCase();

            return value.includes(
                search.toLowerCase()
            );
        });

    return (
        <div>

            <div className="users-search">
                <Search size={18} />

                <input
                    placeholder="Пошук користувача..."
                    value={search}
                    onChange={e =>
                        setSearch(
                            e.target.value
                        )
                    }
                />
            </div>

            {message && (
                <div className="notice">
                    {message}
                </div>
            )}

            {loading ? (
                <div className="users-loading">
                    Завантаження...
                </div>
            ) : filtered.length === 0 ? (
                <div className="users-empty">
                    Користувачів не знайдено
                </div>
            ) : (
                <div className="users-list">

                    {filtered.map(user => (
                        <div
                            className="user-row"
                            key={user.id}
                        >

                            <div className="user-avatar">
                                {(
                                    user.full_name ||
                                    user.email ||
                                    '?'
                                )
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>

                            <div className="user-info">

                                <strong>
                                    {user.full_name ||
                                        'Без імені'}
                                </strong>

                                <small>
                                    {user.email ||
                                        'Email недоступний'}
                                </small>

                            </div>

                            <div className="user-role">

                                {user.role === 'admin' ? (
                                    <span className="role admin">
                                        <Shield size={14} />
                                        Адмін
                                    </span>
                                ) : (
                                    <span className="role user">
                                        <User size={14} />
                                        Користувач
                                    </span>
                                )}

                            </div>

                            <div className="user-actions">

                                {user.role === 'admin' ? (
                                    <button
                                        className="button secondary"
                                        onClick={() =>
                                            changeRole(
                                                user.id,
                                                'user'
                                            )
                                        }
                                    >
                                        Забрати адміна
                                    </button>
                                ) : (
                                    <button
                                        className="button primary"
                                        onClick={() =>
                                            changeRole(
                                                user.id,
                                                'admin'
                                            )
                                        }
                                    >
                                        Зробити адміном
                                    </button>
                                )}

                            </div>

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
}