import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const ProjectCreator = () => {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || user.email || 'Anonymous');
        setIsLoading(false);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  if (isLoading) {
    return (
      <div className="loading-container">
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
              <div className="menu-item logout" onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="content">
        <section className="step-card">
          <h2 className="step-header">
            <span className="step-number">1</span>
            Initialize SDK
          </h2>
          <div className="api-section">
            <h3>Unique API Key</h3>
            <div className="api-key-container">
              <input
                type="text"
                value="YOUR_API_KEY_HERE"
                className="api-key-field"
                readOnly
              />
              <button
                className="copy-button"
                onClick={() => handleCopy('YOUR_API_KEY_HERE')}
              >
                Copy
              </button>
            </div>
          </div>
        </section>

        <section className="step-card">
          <h2 className="step-header">Add this to your environment</h2>
          <div className="api-key-container">
            <div className="platform-card">
              <pre className="api-key-field">npm install my-package</pre>
              <button 
                className="copy-button"
                onClick={() => handleCopy('npm install my-package')}
              >
                Copy
              </button>
            </div>
          </div>
        </section>
        <button>
             Go to Dashboard
        </button>
      </main>
    </div>
  );
};

export default ProjectCreator;