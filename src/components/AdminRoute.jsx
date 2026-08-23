import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute({ children }) {
    const {
        user,
        isAdmin,
        loading
    } = useAuth();

    if (loading) {
        return <div>Завантаження...</div>;
    }

    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
}