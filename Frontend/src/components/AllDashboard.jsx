import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import '../styles/AllDashboard.css';

const AllDashboard = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [projects, setProjects] = useState([]);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserName(user.displayName || user.email || 'Anonymous');
                setEmail(user.email);  // Store the email for later use
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
            setProjects(data.projects || []);  // Set the projects array from the response
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => navigate('/login'))
            .catch((error) => console.error('Error logging out:', error));
    };

    const handleProjectClick = (projectName) => {
        navigate(`/dashboard/${email}/${projectName}`);  // Navigate to the project-specific dashboard
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase();
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
                    {projects.length > 0 ? (
                        projects.map((projectName, index) => (
                            <div key={index} className="project-card">
                                <div className="card-header">
                                    <h2 className="project-title">{projectName}</h2>
                                </div>
                                <div className="card-content">  
                                    <button 
                                        className="project-button" 
                                        onClick={() => handleProjectClick(projectName)}
                                    >
                                        View Project
                                    </button>
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
