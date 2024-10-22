import React, { useState, useEffect } from 'react';
import { Moon, Sun, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ErrorClassificationDashboard() {
  const [selectedError, setSelectedError] = useState(null);
  const [errorData, setErrorData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  // Fetch errors from the API
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

  // Function to analyze error severity based on error type and message
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
    <div>
      <div>
        <div>
          <button onClick={backButtonFunction}>
            <ArrowLeft size={20} />
            Back
          </button>
          <h1>AI Error Classification Dashboard</h1>
          <div>
            <button onClick={() => {}}>
              Critical Alerts: {errorCounts.Critical}
            </button>
            <button onClick={() => {}}>
              High Alerts: {errorCounts.High}
            </button>
            <button onClick={() => {}}>
              Medium: {errorCounts.Medium}
            </button>
            <button onClick={() => {}}>
              Low: {errorCounts.Low}
            </button>
            <button onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        <div>
          <div>
            <div>
              <h2>Error List</h2>
              {errorData?.errors.map((error) => {
                const analysis = analyzeError(error);
                return (
                  <div
                    key={error._id}
                    onClick={() => setSelectedError({ ...error, analysis })}
                  >
                    <span>{analysis.severity}</span>
                    <span>{new Date(error.timestamp).toLocaleTimeString()}: {error.message}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div>
              <h2>Error Details</h2>
              {selectedError ? (
                <>
                  <div>{selectedError.message}</div>
                  <div>
                    {new Date(selectedError.timestamp).toLocaleString()}
                  </div>
                  <div>
                    {selectedError.analysis.severity}
                  </div>
                 
                  <div>
                    <h3>Core Issue</h3>
                    <p>{selectedError.analysis.coreIssue}</p>
                  </div>

                  <div>
                    <h3>Classification</h3>
                    <p>{selectedError.analysis.classification}</p>
                  </div>

                  <div>
                    <h3>Likely Cause</h3>
                    <p>{selectedError.analysis.likelyCause}</p>
                  </div>

                  <div>
                    <h3>Stack Trace</h3>
                    <p>{selectedError.stack}</p>
                  </div>

                  <div>
                    <h3>Suggested Solutions</h3>
                    <ul>
                      {selectedError.analysis.suggestedSolution.map((solution, index) => (
                        <li key={index}>{solution}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3>Tips</h3>
                    <ul>
                      {selectedError.analysis.tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <p>
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