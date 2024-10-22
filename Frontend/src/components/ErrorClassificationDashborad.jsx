import React, { useState, useEffect } from 'react';
import { Moon, Sun, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const styles = {
  body: {
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#f5f5f5'
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    backgroundColor: '#e2e8f0',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  headerButtons: {
    display: 'flex',
    gap: '10px'
  },
  criticalButton1: {
    padding: '8px 16px',
    backgroundColor: '#5452529b',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  criticalButton: {
    padding: '8px 16px',
    backgroundColor: 'rgb(231, 64, 64)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  mediumButton: {
    padding: '8px 16px',
    backgroundColor: '#17a2b8',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  lowButton: {
    padding: '8px 16px',
    backgroundColor: 'orange',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  toggleButton: {
    padding: '8px',
    backgroundColor: '#e2e8f0',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  main: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '20px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #eee',
    cursor: 'pointer',
    gap: '10px'
  },
  badge: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.875rem'
  },
  badge1: {
    padding: '4px 8px',
    borderRadius: '4px',
    display: 'inline-block',
    marginTop: '10px'
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '5px'
  },
  subtitle: {
    color: '#666',
    fontSize: '0.875rem'
  },
  alert: {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '8px',
    marginTop: '15px'
  }
};

export default function ErrorClassificationDashboard() {
  const [selectedError, setSelectedError] = useState(null);
  const [errorData, setErrorData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const fetchErrors = async () => {
    try {
      const response = await fetch('http://localhost:3000/errors/dinnerborne@gmail.com/AlphaProject');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setErrorData(data.data);
    } catch (error) {
      console.error('Error fetching the errors:', error);
    }
  };

  useEffect(() => {
    fetchErrors();
    const intervalId = setInterval(fetchErrors, 15000);
    return () => clearInterval(intervalId);
  }, []);

  const backButtonFunction = () => {
    navigate('/error-dashboard');
  };

  const analyzeError = (error) => {
    const analysis = {
      severity: 'Low',
      error: error.message,
      coreIssue: '',
      classification: '',
      likelyCause: '',
      suggestedSolution: [],
      tips: []
    };

    if (error.type === 'serverError') {
      if (error.message.includes('crashed')) {
        analysis.severity = 'Critical';
        analysis.coreIssue = 'Server System Failure';
        analysis.classification = 'System Crash';
        analysis.likelyCause = 'Unexpected server termination';
        analysis.suggestedSolution = ['Restart server', 'Check system logs', 'Monitor server resources'];
        analysis.tips = ['Implement automated recovery', 'Set up monitoring alerts'];
      } else if (error.message.includes('simulated')) {
        analysis.severity = 'Medium';
        analysis.coreIssue = 'Test Error';
        analysis.classification = 'Simulated Error';
        analysis.likelyCause = 'Intentional error generation';
        analysis.suggestedSolution = ['Review test parameters', 'Verify test conditions'];
        analysis.tips = ['Document test scenarios', 'Update test cases'];
      }
    }

    return analysis;
  };

  const getErrorTypeStyle = (severity) => {
    switch (severity) {
      case 'Critical':
        return { backgroundColor: '#5452529b', color: 'white' };
      case 'High':
        return { backgroundColor: 'rgb(231, 64, 64)', color: 'white' };
      case 'Low':
        return { backgroundColor: 'orange', color: 'white' };
      case 'Medium':
        return { backgroundColor: '#17a2b8', color: 'white' };
      default:
        return { backgroundColor: 'gray', color: 'white' };
    }
  };

  // Calculate error counts
  const errorCounts = {
    Critical: 0,
    High: 0,
    Medium: 0,
    Low: 0
  };

  errorData?.errors.forEach(error => {
    const analysis = analyzeError(error);
    errorCounts[analysis.severity]++;
  });

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.header}>
          <button style={styles.backButton} onClick={backButtonFunction}>
            <ArrowLeft size={20} style={{ marginRight: '5px' }} />
            Back
          </button>
          <h1>AI Error Classification Dashboard</h1>
          <div style={styles.headerButtons}>
            <button style={styles.criticalButton1}>
              Critical Alerts: {errorCounts.Critical}
            </button>
            <button style={styles.criticalButton}>
              High Alerts: {errorCounts.High}
            </button>
            <button style={styles.mediumButton}>
              Medium: {errorCounts.Medium}
            </button>
            <button style={styles.lowButton}>
              Low: {errorCounts.Low}
            </button>
            <button style={styles.toggleButton} onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        <div style={styles.main}>
          <div>
            <div style={styles.card}>
              <h2>Error List</h2>
              {errorData?.errors.map((error) => {
                const analysis = analyzeError(error);
                return (
                  <div
                    key={error._id}
                    style={styles.listItem}
                    onClick={() => setSelectedError({ ...error, analysis })}
                  >
                    <span style={{ ...styles.badge, ...getErrorTypeStyle(analysis.severity) }}>
                      {analysis.severity}
                    </span>
                    <span>{new Date(error.timestamp).toLocaleTimeString()}: {error.message}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div style={styles.card}>
              <h2>Error Details</h2>
              {selectedError ? (
                <>
                  <div style={styles.title}>{selectedError.message}</div>
                  <div style={styles.subtitle}>
                    {new Date(selectedError.timestamp).toLocaleString()}
                  </div>
                  <div style={{ ...styles.badge1, ...getErrorTypeStyle(selectedError.analysis.severity) }}>
                    {selectedError.analysis.severity}
                  </div>
                 
                  <div style={styles.alert}>
                    <h3>Core Issue</h3>
                    <p>{selectedError.analysis.coreIssue}</p>
                  </div>

                  <div style={styles.alert}>
                    <h3>Classification</h3>
                    <p>{selectedError.analysis.classification}</p>
                  </div>

                  <div style={styles.alert}>
                    <h3>Likely Cause</h3>
                    <p>{selectedError.analysis.likelyCause}</p>
                  </div>

                  <div style={styles.alert}>
                    <h3>Stack Trace</h3>
                    <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                      {selectedError.stack}
                    </pre>
                  </div>

                  <div style={styles.alert}>
                    <h3>Suggested Solutions</h3>
                    <ul>
                      {selectedError.analysis.suggestedSolution.map((solution, index) => (
                        <li key={index}>{solution}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={styles.alert}>
                    <h3>Tips</h3>
                    <ul>
                      {selectedError.analysis.tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <p style={{ textAlign: 'center', color: isDarkMode ? '#aaa' : '#666' }}>
                  Select an error to view details
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
