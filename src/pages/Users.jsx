import { useEffect, useMemo, useState } from 'react';
import { Search, Shield, ShieldOff, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Users() {

    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState(new Set());

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(null);
    const [message, setMessage] = useState('');

    async function loadUsers() {

        if (!supabase) return;

        setLoading(true);
        setMessage('');

        try {

            const [
                profilesResult,
                adminsResult
            ] = await Promise.all([

                supabase
                    .from('profiles')
                    .select('id, full_name, created_at')
                    .order('created_at', {
                        ascending: false
                    }),

                supabase
                    .from('admin_users')
                    .select('user_id')

            ]);

            if (profilesResult.error) {
                throw profilesResult.error;
            }

            if (adminsResult.error) {
                throw adminsResult.error;
            }

            /*
             * Важливо:
             * email ми поки не беремо з auth.users.
             *
             * Тому зараз користувачі показуються
             * по full_name.
             */

            setUsers(profilesResult.data || []);

            setAdmins(
                new Set(
                    (adminsResult.data || [])
                        .map(x => x.user_id)
                )
            );

        } catch (error) {

            console.error(
                'LOAD USERS ERROR:',
                error
            );

            setMessage(
                error.message ||
                'Не вдалося завантажити користувачів'
            );

        } finally {

            setLoading(false);

        }
    }


    useEffect(() => {

        loadUsers();

    }, []);


    async function changeAdmin(
        userId,
        makeAdmin
    ) {

        const action = makeAdmin
            ? 'надати'
            : 'забрати';

        const confirmed = window.confirm(
            `Ви впевнені, що хочете ${action} користувачу права адміністратора?`
        );

        if (!confirmed) return;

        setSaving(userId);
        setMessage('');

        try {

            const {
                data,
                error
            } = await supabase.rpc(
                'set_admin',
                {
                    target_user_id: userId,
                    make_admin: makeAdmin
                }
            );

            if (error) {
                throw error;
            }

            if (!data) {
                throw new Error(
                    'Операція не була виконана'
                );
            }

            await loadUsers();

        } catch (error) {

            console.error(
                'CHANGE ADMIN ERROR:',
                error
            );

            setMessage(
                error.message ||
                'Не вдалося змінити роль'
            );

        } finally {

            setSaving(null);

        }
    }


    const filteredUsers = useMemo(() => {

        const query =
            search
                .trim()
                .toLowerCase();

        if (!query) {
            return users;
        }

        return users.filter(user =>
            (user.full_name || '')
                .toLowerCase()
                .includes(query)
        );

    }, [users, search]);


    return (
        <div className="users-page">

            <div className="admin-panel">

                <div className="panel-head">

                    <div>
                        <h2>
                            Користувачі
                        </h2>

                        <p className="muted">
                            Керування користувачами
                            та адміністраторами
                        </p>
                    </div>

                    <button
                        type="button"
                        className="button secondary"
                        onClick={loadUsers}
                        disabled={loading}
                    >
                        <RefreshCw size={16} />

                        Оновити
                    </button>

                </div>


                {message && (
                    <div className="notice">
                        {message}
                    </div>
                )}


                <div className="users-search">

                    <Search size={18} />

                    <input
                        type="search"
                        placeholder="Пошук користувача..."
                        value={search}
                        onChange={e =>
                            setSearch(e.target.value)
                        }
                    />

                </div>


                {loading ? (

                    <div className="users-loading">
                        Завантаження...
                    </div>

                ) : filteredUsers.length === 0 ? (

                    <div className="users-empty">
                        Користувачів не знайдено.
                    </div>

                ) : (

                    <div className="users-list">

                        {filteredUsers.map(user => {

                            const isAdmin =
                                admins.has(user.id);

                            return (
                                <div
                                    className="user-row"
                                    key={user.id}
                                >

                                    <div className="user-avatar">
                                        {(user.full_name ||
                                            '?')
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>


                                    <div className="user-info">

                                        <strong>
                                            {user.full_name ||
                                                'Без імені'}
                                        </strong>

                                        <small>
                                            ID: {user.id}
                                        </small>

                                        <small>
                                            Реєстрація:{' '}
                                            {new Date(
                                                user.created_at
                                            ).toLocaleDateString(
                                                'uk-UA'
                                            )}
                                        </small>

                                    </div>


                                    <div className="user-role">

                                        {isAdmin ? (

                                            <span className="role admin">
                                                <Shield size={15} />
                                                ADMIN
                                            </span>

                                        ) : (

                                            <span className="role user">
                                                USER
                                            </span>

                                        )}

                                    </div>


                                    <div className="user-actions">

                                        {isAdmin ? (

                                            <button
                                                className="button secondary"
                                                disabled={
                                                    saving === user.id
                                                }
                                                onClick={() =>
                                                    changeAdmin(
                                                        user.id,
                                                        false
                                                    )
                                                }
                                            >
                                                <ShieldOff
                                                    size={16}
                                                />

                                                {saving === user.id
                                                    ? 'Збереження...'
                                                    : 'Забрати admin'}
                                            </button>

                                        ) : (

                                            <button
                                                className="button primary"
                                                disabled={
                                                    saving === user.id
                                                }
                                                onClick={() =>
                                                    changeAdmin(
                                                        user.id,
                                                        true
                                                    )
                                                }
                                            >
                                                <Shield
                                                    size={16}
                                                />

                                                {saving === user.id
                                                    ? 'Збереження...'
                                                    : 'Зробити admin'}
                                            </button>

                                        )}

                                    </div>

                                </div>
                            );

                        })}

                    </div>

                )}

            </div>

        </div>
    );
}