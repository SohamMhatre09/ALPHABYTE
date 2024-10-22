import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from './components/Home/Home';
import Login from './components/Login';
import Register from './components/Register';
import ErrorClassificationDashboard from "./components/ErrorClassificationDashborad";
import ProjectCreator from "./components/CreateNewProject";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth } from "./components/Firebase"; // Assuming you're using Firebase auth

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    
    return () => unsubscribe(); // Cleanup the subscription on component unmount
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={user ? <Navigate to="/create-new" /> : <Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/create-new-project" element={<ProjectCreator />} />
              <Route path="/error-classification-dashboard" element={user ? <ErrorClassificationDashboard /> : <Navigate to="/login" />} />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
