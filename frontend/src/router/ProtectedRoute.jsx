import { useLocation, Navigate } from 'react-router-dom';

export default function ProtectedRoute({ user, children }) {
    const location = useLocation();

    if (!user) {
        // If the user is not logged in, redirect to the login page
        // Keep track of the location the user was at when asked to log in
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If the user is logged in, render the child components
    return children;
}
