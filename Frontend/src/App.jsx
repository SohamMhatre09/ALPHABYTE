import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login';
import Register from './components/Register';
import ErrorClassificationDashboard from "./components/ErrorClassificationDashborad";
import ProjectCreator from "./components/CreateNewProject";
import InitializeProject from "./components/InitializeProject";
import AllDashboard from "./components/AllDashboard"; // Import the new component
import ProjectDashboard from "./components/ErrorClassificationDashborad"; // Import your new ProjectDashboard component
import AuthGuard from "./components/AuthGuard";
import { auth } from "./components/Firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);  // Track if Firebase has finished loading

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      setIsInitialized(true);  // Only set this to true once Firebase resolves the auth state
    });

    return () => unsubscribe();
  }, []);

  // Prevent rendering any routes until Firebase confirms the auth state
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route 
                path="/login" 
                element={user ? <Navigate to="/create-new-project" /> : <Login />} 
              />
              <Route 
                path="/register" 
                element={user ? <Navigate to="/create-new-project" /> : <Register />} 
              />

              {/* Protected routes */}
              <Route
                path="/create-new-project"
                element={
                  <AuthGuard>
                    <ProjectCreator />
                  </AuthGuard>
                }
              />
              <Route
                path="/initialize-project"
                element={
                  <AuthGuard>
                    <InitializeProject />
                  </AuthGuard>
                }
              />
              <Route
                path="/error-classification-dashboard"
                element={
                  <AuthGuard>
                    <ErrorClassificationDashboard />
                  </AuthGuard>
                }
              />
              <Route
                path="/all-dashboard"  // Add the new route here
                element={
                  <AuthGuard>
                    <AllDashboard />
                  </AuthGuard>
                }
              />
              <Route
                path="/dashboard/:email/:projectName" // Add your new route here
                element={
                  <AuthGuard>
                    <ProjectDashboard />
                  </AuthGuard>
                }
              />

              {/* Redirect /logout to login page */}
              <Route 
                path="/logout" 
                element={<Navigate to="/login" replace />} 
              />
              
              {/* Catch all route - redirect to home */}
              <Route 
                path="*" 
                element={<Navigate to="/" replace />} 
              />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
