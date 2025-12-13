import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>;
    }

    return currentUser ? children : <Navigate to="/login" />;
};
