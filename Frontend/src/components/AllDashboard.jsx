import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { Clock, AlertCircle, Server } from 'lucide-react';
import '../styles/AllDashboard.css';

const AllDashboard = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [userName, setUserName] = useState('');
    const [projects, setProjects] = useState({});
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserName(user.displayName || user.email || 'Anonymous');
                await fetchProjects(user.email);
                setIsLoading(false);
            } else {
                navigate('/login');
            }
        });

        return () => unsubscribe();
    }, [auth, navigate]);

    const fetchProjects = async (email) => {
        try {
            const response = await fetch(`http://localhost:3000/projects/${email}`);
            const data = await response.json();
            console.log(data)
            setProjects(data[email] || {});
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => navigate('/login'))
            .catch((error) => console.error('Error logging out:', error));
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase();
    };

    const formatTimestamp = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-text">Loading...</div>
            </div>
        );
    }

    return (
        <div className="dashboard">
            {/* Navbar */}
            <nav className="navbar">
                <div className="logo">ProResolve</div>
                <div className="profile-section">
                    <div 
                        className="avatar" 
                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    >
                        {getInitials(userName)}
                    </div>
                    {isProfileMenuOpen && (
                        <div className="profile-menu">
                            <div className="menu-item">Profile</div>
                            <div className="menu-item">Settings</div>
                            <div className="menu-item logout" onClick={handleLogout}>
                                Logout
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <main className="main-content">
                <h1 className="page-title">Your Projects</h1>
                <div className="projects-grid">
                    {Object.entries(projects).length > 0 ? (
                        Object.entries(projects).map(([projectName, projectData]) => (
                            <div key={projectName} className="project-card">
                                <div className="card-header">
                                    <h2 className="project-title">{projectName}</h2>
                                    <span className="error-badge">
                                        {projectData.errors.length} Errors
                                    </span>
                                </div>
                                <div className="card-content">
                                    <div className="errors-list">
                                        {projectData.errors.slice(0, 3).map((error, index) => (
                                            <div key={index} className="error-item">
                                                <div className="error-header">
                                                    <AlertCircle className="error-icon" />
                                                    <span className="error-type">{error.type}</span>
                                                </div>
                                                <p className="error-message">{error.message}</p>
                                                <div className="error-meta">
                                                    <div className="meta-item">
                                                        <Server className="meta-icon" />
                                                        {error.route}
                                                    </div>
                                                    <div className="meta-item">
                                                        <Clock className="meta-icon" />
                                                        {formatTimestamp(error.timestamp)}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {projectData.errors.length > 3 && (
                                            <div className="more-errors">
                                                +{projectData.errors.length - 3} more errors
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No projects found for this user.</div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AllDashboard;
