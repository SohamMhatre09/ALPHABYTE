import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const InitializeProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sdkCode, setSdkCode] = useState('');
  const auth = getAuth();

  // Check if we have project data
  useEffect(() => {
    if (!location.state) {
      navigate('/');
      return;
    }
  }, [location.state, navigate]);

  // Safely destructure project data with default values
  const { 
    projectName = '', 
    selectedPlatform = '', 
    userName: projectUserName = '', 
    createdAt = '' 
  } = location.state || {};

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

  useEffect(() => {
    if (projectName && userName && selectedPlatform) {
      generateSDKCode();
    }
  }, [projectName, userName, selectedPlatform]);

  const generateSDKCode = () => {
    let code;
    switch (selectedPlatform) {
      case 'Node.js':
        code = generateNodeSDK();
        break;
      case 'Python':
        code = generatePythonSDK();
        break;
      case 'React':
        code = generateReactSDK();
        break;
      case 'Vue.js':
        code = generateVueSDK();
        break;
      default:
        code = generateNodeSDK(); // Default to Node.js
    }
    setSdkCode(code);
  };

  const generateNodeSDK = () => {
    return `// Error Tracking SDK for ${projectName}
// Add this middleware after all your routes

const errorTrackingMiddleware = (err, req, res, next) => {
    const errorDetails = {
        type: 'serverError',
        message: err.message,
        stack: err.stack,
        route: req.originalUrl,
        method: req.method,
        timestamp: new Date().toISOString(),
        projectInfo: {
            userName: '${userName}',
            projectName: '${projectName}',
            platform: '${selectedPlatform}'
        }
    };

    // Send the error to your error tracking server
    fetch('https://foremost-sweltering-dew.glitch.me/error-handler', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'X-Project-Name': '${projectName}',
            'X-User-Name': '${userName}'
        },
        body: JSON.stringify(errorDetails)
    }).catch(error => console.error('Error reporting failed:', error));

    // Respond to the client with a generic error message
    res.status(500).send('Internal Server Error');
};

// Usage:
app.use(errorTrackingMiddleware);`;
  };

  const generatePythonSDK = () => {
    return `# Error Tracking SDK for ${projectName}
import requests
from functools import wraps
from datetime import datetime

def error_tracking_middleware(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            error_details = {
                "type": "serverError",
                "message": str(e),
                "stack": traceback.format_exc(),
                "timestamp": datetime.now().isoformat(),
                "projectInfo": {
                    "userName": "${userName}",
                    "projectName": "${projectName}",
                    "platform": "${selectedPlatform}"
                }
            }
            
            try:
                requests.post(
                    'https://foremost-sweltering-dew.glitch.me/error-handler',
                    json=error_details,
                    headers={
                        'Content-Type': 'application/json',
                        'X-Project-Name': '${projectName}',
                        'X-User-Name': '${userName}'
                    }
                )
            except Exception as report_error:
                print(f"Error reporting failed: {report_error}")
                
            raise  # Re-raise the original exception
    return wrapper

# Usage:
@error_tracking_middleware
def your_function():
    # Your code here
    pass`;
  };

  const generateReactSDK = () => {
    return `// Error Tracking SDK for ${projectName}
import { ErrorBoundary } from 'react-error-boundary';

const errorHandler = (error, errorInfo) => {
  const errorDetails = {
    type: 'clientError',
    message: error.message,
    stack: error.stack,
    componentStack: errorInfo.componentStack,
    timestamp: new Date().toISOString(),
    projectInfo: {
      userName: '${userName}',
      projectName: '${projectName}',
      platform: '${selectedPlatform}'
    }
  };

  fetch('https://foremost-sweltering-dew.glitch.me/error-handler', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Project-Name': '${projectName}',
      'X-User-Name': '${userName}'
    },
    body: JSON.stringify(errorDetails)
  }).catch(error => console.error('Error reporting failed:', error));
};

// Usage:
<ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
  <YourApp />
</ErrorBoundary>`;
  };

  const generateVueSDK = () => {
    return `// Error Tracking SDK for ${projectName}
export default {
  install: (app) => {
    app.config.errorHandler = (error, instance, info) => {
      const errorDetails = {
        type: 'clientError',
        message: error.message,
        stack: error.stack,
        componentInfo: info,
        timestamp: new Date().toISOString(),
        projectInfo: {
          userName: '${userName}',
          projectName: '${projectName}',
          platform: '${selectedPlatform}'
        }
      };

      fetch('https://foremost-sweltering-dew.glitch.me/error-handler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Project-Name': '${projectName}',
          'X-User-Name': '${userName}'
        },
        body: JSON.stringify(errorDetails)
      }).catch(error => console.error('Error reporting failed:', error));
    };
  }
};

// Usage:
// import ErrorTracking from './error-tracking';
// app.use(ErrorTracking);`;
  };

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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(sdkCode);
      alert('SDK code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard', { state: { projectName, userName } });
  };

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
            Initialize SDK for {selectedPlatform}
          </h2>
          <div className="sdk-container">
            <code>
            <pre className="code-block">
              {sdkCode}
            </pre>
            </code>
            <button
              className="copy-button"
              onClick={copyToClipboard}
            >
              Copy SDK Code
            </button>
          </div>
        </section>


        <button 
          className="dashboard-button"
          onClick={handleGoToDashboard}
        >
          Go to Dashboard
        </button>
      </main>
    </div>
  );
};

export default InitializeProject;