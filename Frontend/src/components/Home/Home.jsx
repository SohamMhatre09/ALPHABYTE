import React, { useState, useEffect } from 'react';
import { AlertCircle, BarChart2, FileSearch, Layers, Zap, Sun, Moon } from "lucide-react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import img1 from '../../assets/ceo1.jpg';
import img2 from '../../assets/ceo2.jpg';
import img3 from '../../assets/ceo3.png';
import vid from '../../assets/vid.mp4';

const images = [img1, img2, img3];


export default function ErrorSolverHomepage() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleClick = () => {
    navigate('/error-classification-dashboard'); // Navigate to login-signup page
  };

  return (
    <div className={`error-solver-homepage ${theme}`}>
      <header className="header">
        <a href="#" className="logo">
          <AlertCircle className="logo-icon" />
          <span className="logo-text">ProResolve</span>
        </a>
        <nav className="nav">
          <a href="#" className="nav-link">Features</a>
          <a href="#" className="nav-link">Pricing</a>
          <a href="/login" className="nav-link">Sign In</a>
          <a href="/register" className="nav-link">Register</a>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? <Moon /> : <Sun />}
          </button>
        </nav>
      </header>
      <main>
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">Effortlessly Resolve System Errors in Real Time</h1>
            <p className="hero-subtitle">Analyze, classify, and resolve errors with advanced AI-powered insights.</p>
            <button className="cta-button" onClick={handleClick}>Get Started</button>
          </div>
        </section>
        <section className="features">
          <div className="container">
            <h2 className="section-title">Key Features</h2>
            <div className="feature-grid">
              <div className="feature-card">
                <FileSearch className="feature-icon" />
                <h3 className="feature-title">Analyze System Log Files</h3>
                <p className="feature-description">Detect patterns and identify root causes automatically.</p>
              </div>
              <div className="feature-card">
                <Layers className="feature-icon" />
                <h3 className="feature-title">Classify Errors</h3>
                <p className="feature-description">Categorize errors by type—critical, non-critical, warnings—for easier prioritization.</p>
              </div>
              <div className="feature-card">
                <Zap className="feature-icon" />
                <h3 className="feature-title">Suggest Solutions</h3>
                <p className="feature-description">Receive actionable recommendations for error resolution.</p>
              </div>
              <div className="feature-card">
                <BarChart2 className="feature-icon" />
                <h3 className="feature-title">User-Friendly Interface</h3>
                <p className="feature-description">Navigate through error classifications with ease.</p>
              </div>
              <div className="feature-card">
                <Layers className="feature-icon" />
                <h3 className="feature-title">Scalable Architecture</h3>
                <p className="feature-description">Handle large datasets in real time for enterprise-level performance.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="demo">
          <div className="container">
            <h2 className="section-title">See It in Action</h2>
            {/* video erro solved */}
            <div className="demo-video">
              <video
                src={vid}
                alt="Product demo video placeholder"
                className="demo-image"
                muted
                autoPlay
                loop
              />
            </div>
            <button className="cta-button">Watch Demo</button>
          </div>
        </section>
        <section className="testimonials">
          <div className="container">
            <h2 className="section-title">What Our Customers Say</h2>
            <div className="testimonial-grid">
              {[1, 2, 3].map((i) => (
                <div key={i} className="testimonial-card">
                  <div className="testimonial-header">
                    <img
                      src={img3}
                      alt={`User ${i}`}
                      className="testimonial-avatar"
                    />
                    <div>
                      <h3 className="testimonial-name">Rajnish Mohan</h3>
                      <p className="testimonial-position">CTO, Tech Company</p>
                    </div>
                  </div>
                  <p className="testimonial-text">
                    "ErrorSolver has dramatically improved our error resolution process. It's like having an expert
                    system administrator working 24/7."
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="faq">
          <div className="container">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="faq-list">
              <details className="faq-item">
                <summary className="faq-question">How easy is it to set up ErrorSolver?</summary>
                <p className="faq-answer">
                  Setting up ErrorSolver is straightforward. Our step-by-step guide will walk you through the process,
                  which typically takes less than 30 minutes.
                </p>
              </details>
              <details className="faq-item">
                <summary className="faq-question">Can ErrorSolver integrate with my existing tools?</summary>
                <p className="faq-answer">
                  Yes, ErrorSolver is designed to integrate seamlessly with a wide range of existing tools and
                  platforms. We provide APIs and plugins for most popular systems.
                </p>
              </details>
              <details className="faq-item">
                <summary className="faq-question">What kind of support do you offer?</summary>
                <p className="faq-answer">
                  We offer 24/7 customer support via email and chat. Our enterprise plans also include dedicated support
                  teams and personalized onboarding.
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <p className="copyright">© 2024 ErrorSolver. All rights reserved.</p>
          <nav className="footer-nav">
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#" className="footer-link">Privacy</a>
          </nav>
        </div>
      </footer>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
        :root {
          --bg-primary: #ffffff;
          --bg-secondary: #f9fafb;
          --text-primary: #333333;
          --text-secondary: #666666;
          --accent-color: #4f46e5;
          --accent-hover: #4338ca;
          --card-bg: #ffffff;
          --card-shadow: 0 4px 6px rgba(0,0,0,0.1);
          --hero-overlay: rgba(0, 0, 0, 0.5);
        }

        .dark {
          --bg-primary: #1a1a1a;
          --bg-secondary: #2a2a2a;
          --text-primary: #ffffff;
          --text-secondary: #cccccc;
          --accent-color: #6366f1;
          --accent-hover: #818cf8;
          --card-bg: #2a2a2a;
          --card-shadow: 0 4px 6px rgba(255,255,255,0.1);
          --hero-overlay: rgba(0, 0, 0, 0.7);
        }

        body {
          font-family: 'Poppins', sans-serif;
          transition: background-color 0.3s ease;
          margin:0;
          padding:0;
        }

        .error-solver-homepage {
          line-height: 1.5;
          color: var(--text-primary);
          background-color: var(--bg-primary);
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background-color: var(--bg-primary);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: var(--text-primary);
        }
        .logo-icon {
          width: 24px;
          height: 24px;
          margin-right: 0.5rem;
        }
        .logo-text {
          font-size: 1.5rem;
          font-weight: bold;
        }
        .nav {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        .nav-link {
          text-decoration: none;
          color: var(--text-primary);
        }
        .nav-link:hover {
          text-decoration: underline;
        }
        .theme-toggle {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-primary);
        }
        .hero {
          background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80');
          background-size: cover;
          background-position: center;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--hero-overlay);
        }
        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
          color: #ffffff;
          max-width: 800px;
          padding: 2rem;
        }
        .hero-title {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        .hero-subtitle {
          font-size: 1.5rem;
          margin-bottom: 2rem;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        }
        .cta-button {
          background-color: var(--accent-color);
          color: #ffffff;
          border: none;
          padding: 1rem 2rem;
          font-size: 1.25rem;
          border-radius: 0.25rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .cta-button:hover {
          background-color: var(--accent-hover);
        }
        .section-title {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 3rem;
          color: var(--text-primary);
        }
        .features {
          padding: 6rem 0;
          background-color: var(--bg-secondary);
        }
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        .feature-card {
          background-color: var(--card-bg);
          padding: 2rem;
          border-radius: 0.5rem;
          box-shadow: var(--card-shadow);
          transition: transform 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-5px);
        }
        .feature-icon {
          width: 48px;
          height: 48px;
          color: var(--accent-color);
          margin-bottom: 1rem;
        }
        .feature-title {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }
        .feature-description {
          color: var(--text-secondary);
        }
        .demo {
          padding: 6rem 0;
          text-align: center;
          background-color: var(--bg-primary);
        }
        .demo-video {
          margin-bottom: 2rem;
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: var(--card-shadow);
        }
        .demo-image {
          max-width: 100%;
          height: auto;
        }
        .testimonials {
          padding: 6rem 0;
          background-color: var(--bg-secondary);
        }
        .testimonial-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        .testimonial-card {
          background-color: var(--card-bg);
          padding: 2rem;
          border-radius: 0.5rem;
          box-shadow: var(--card-shadow);
        }
        .testimonial-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }
        .testimonial-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-right: 1rem;
        }
        .testimonial-name {
          font-weight: bold;
          color: var(--text-primary);
        }
        .testimonial-position {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }
        .testimonial-text {
          font-style: italic;
          color: var(--text-primary);
        }
        .faq {
          padding: 6rem 0;
          background-color: var(--bg-primary);
        }
        .faq-list {
          max-width: 800px;
          margin: 0 auto;
        }
        .faq-item {
          margin-bottom: 1.5rem;
          border-bottom:1px solid black;
          border-radius:4px;
        }
        .faq-question {
          font-weight: bold;
          cursor: pointer;
          color: var(--text-primary);
          padding: 1rem;
          background-color: var(--bg-secondary);
          border-radius: 0.25rem;
          transition: background-color 0.3s ease;
        }
        .faq-question:hover {
          background-color: var(--accent-color);
          color: #ffffff;
        }
        .faq-answer {
          margin-top: 0.5rem;
          padding: 1rem;
          color: var(--text-secondary);
          background-color: var(--card-bg);
          border-radius: 0.25rem;
        }
        .footer {
          background-color: var(--bg-secondary);
          padding: 2rem 0;
          border-top: 1px solid var(--text-secondary);
        }
        .footer .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .copyright {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
        .footer-nav {
          display: flex;
          gap: 1rem;
        }
        .footer-link {
          font-size: 0.875rem;
          color: var(--text-secondary);
          text-decoration: none;
        }
        .footer-link:hover {
          text-decoration: underline;
        }
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-subtitle {
            font-size: 1.25rem;
          }
          .feature-grid, .testimonial-grid {
            grid-template-columns: 1fr;
          }
          .footer .container {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
