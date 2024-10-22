import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import '../styles/AllDashboard.css'; // Importing the CSS styles

const AllDashboard = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [userName, setUserName] = useState('');
    const [projects, setProjects] = useState([]);
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
            const response = await fetch(`http://localhost:3002/api/projects?email=${encodeURIComponent(email)}`);
            const data = await response.json();
            setProjects(data.errors || []);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigate('/login');
            })
            .catch((error) => {
                console.error('Error logging out:', error);
            });
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
            <div className="loading">
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
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
                            <div className="menu-item" onClick={handleLogout}>Logout</div>
                        </div>
                    )}
                </div>
            </nav>

            <div className="content">
                <h1 className="title">Your Projects</h1>
                <div className="projects-container">
                    {projects.map((project, index) => (
                        <div key={index} className="project-card">
                            <h2>{project.name}</h2>
                            <ul>
                                {Object.keys(project.errors).map((error, i) => (
                                    <li key={i}>
                                        {error}: {project.errors[error].join(', ')}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllDashboard;
