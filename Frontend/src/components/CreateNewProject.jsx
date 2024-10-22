import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import '../styles/ProjectCreator.css';

const ProjectCreator = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('popular');
  const [projectName, setProjectName] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);  // Added loading state

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || user.email || 'Anonymous');
        setIsLoading(false);  // Set loading to false when user is determined
      } else {
        setTimeout(() => navigate('/login'), 500);  // Slight delay to ensure auth state is loaded
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

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

  const tabs = [
    { id: 'popular', label: 'Popular' },
    { id: 'browser', label: 'Browser' },
    { id: 'server', label: 'Server' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'desktop', label: 'Desktop' },
    { id: 'serverless', label: 'Serverless' },
    { id: 'all', label: 'All' },
  ];

  const platforms = [
    { name: 'Node.js', description: 'JavaScript runtime built on Chrome\'s V8 engine', color: '#68a063' },
    { name: 'Python', description: 'General-purpose programming language', color: '#4584b6' },
    { name: 'React', description: 'JavaScript library for building user interfaces', color: '#61dafb' },
    { name: 'Vue.js', description: 'Progressive JavaScript framework', color: '#42b883' },
  ];

  // Prevent rendering until authentication is confirmed
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="app-container">
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
              <div 
                className="menu-item logout"
                onClick={handleLogout} 
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="content">
        <h1 className="title">Create a new project in 2 steps</h1>
        <p className="subtitle">
          Set up a separate project for each part of your application (for example, your API server and frontend client), to
          quickly pinpoint which part of your application errors are coming from.{' '}
          <a href="#" className="link">Read the docs.</a>
        </p>

        <div className="steps-container">
          <section className="step-card">
            <h2 className="step-header">
              <span className="step-number">1</span>
              Choose your platform
            </h2>
            <div className="tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="platforms-grid">
              {platforms.map((platform) => (
                <div 
                  key={platform.name}
                  className={`platform-card ${selectedPlatform === platform.name ? 'selected' : ''}`}
                  onClick={() => setSelectedPlatform(platform.name)}
                >
                  <div 
                    className="platform-icon"
                    style={{ backgroundColor: platform.color }}
                  >
                    {platform.name[0]}
                  </div>
                  <div className="platform-info">
                    <h3>{platform.name}</h3>
                    <p>{platform.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="step-card">
            <h2 className="step-header">
              <span className="step-number">2</span>
              Name your project
            </h2>
            <div className="input-group">
              <label htmlFor="project-name">Project name</label>
              <input
                type="text"
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="my-awesome-project"
              />
            </div>
          </section>

          <button 
            className="create-button"
            disabled={!selectedPlatform || !projectName}
            onClick={() => alert(`Creating ${projectName} with ${selectedPlatform}`)}
          >
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCreator;
