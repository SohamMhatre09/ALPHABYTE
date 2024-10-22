import { Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from './Firebase';

const AuthGuard = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(true);
      setIsLoading(false);  // Only set isLoading to false after auth state is determined
    });

    return () => unsubscribe();  // Clean up subscription
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default AuthGuard;
