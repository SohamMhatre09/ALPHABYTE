import React, { useState } from 'react';

const ProjectCreator = () => {
  const [activeTab, setActiveTab] = useState('popular');
  const [projectName, setProjectName] = useState('');

  const platforms = [
    { name: "Android", icon: "M17 1.5l2 3m-12 0l-2 3m16 9v-4a4 4 0 00-4-4H7a4 4 0 00-4 4v4" },
    { name: "Angular", icon: "M11.99 2.58L4.55 4.15 3 12c.75 5.45 2.79 7.95 8.99 9.95 6.2-2 8.24-4.5 8.99-9.95l-1.55-7.85-7.43-1.57z" },
    { name: ".NET", icon: "M16 12h3m-3-4h3m-3 8h3" },
    { name: "JavaScript", icon: "M6 3h12l3 9-3 9H6l-3-9 3-9z" },
    { name: "Django", icon: "M12 4.5v7l-2.5-2m5 0l-2.5 2" },
    { name: "Express", icon: "M7 8h10v8H7V8z" },
    { name: "FastAPI", icon: "M13 2L3 14h18L11 2h2z" },
    { name: "Flask", icon: "M5 8l1-2 1 2m-2 6l1 2 1-2m4-3h8l1 3v4l-1 3H9l-1-3v-4l1-3z" },
    { name: "Flutter", icon: "M10 2L4 8l6 6-6 6" },
    { name: "Go", icon: "M4 12h16M4 6h16M4 18h16" },
    { name: "iOS", icon: "M12 2l1.5 2.5H10.5L12 2z" },
    { name: "Java", icon: "M9 18s1-3 3-3 3 3 3 3" },
    { name: "Laravel", icon: "M4 4h16v16H4z" },
    { name: "Next.js", icon: "M5 8h10v8H5V8z" },
    { name: "Node.js", icon: "M3 3v18h18V3H3z" },
    { name: "PHP", icon: "M10 2H2v8h8m12-8h-8v8h8z" },
    { name: "Python", icon: "M8 4H4v4h4M16 4h-4v4h4" },
    { name: "Rails", icon: "M5 5l14 14" },
    { name: "React", icon: "M12 2.5a9.5 9.5 0 00-6.6 16.6m0-13.2a9.5 9.5 0 0113.2 13.2" },
    { name: "React Native", icon: "M12 4a8 8 0 100 16 8 8 0 000-16z" },
    { name: "Ruby", icon: "M4 4h16v16H4z" },
    { name: "Spring Boot", icon: "M2 12h16" },
    { name: "Unity", icon: "M6 12h12" },
    { name: "Vue", icon: "M5 8h14v8H5V8z" },
  ];

  const tabs = ['Popular', 'Browser', 'Server', 'Mobile', 'Desktop', 'Serverless', 'All'];

  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', padding: '20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Create a new project in 2 steps</h1>
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '20px' }}>
          Set up a separate project for each part of your application (for example, your API server and frontend client), to
          quickly pinpoint which part of your application errors are coming from.{' '}
          <a href="#" style={{ color: '#3b82f6' }}>
            Read the docs.
          </a>
        </p>

        <div style={{ marginBottom: '40px' }}>
          <section style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ backgroundColor: '#3b82f6', color: '#fff', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>1</span>
              Choose your platform
            </h2>
            <div style={{ marginBottom: '20px' }}>
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  style={{
                    marginRight: '10px',
                    marginBottom: '10px',
                    padding: '10px 20px',
                    fontSize: '14px',
                    borderRadius: '20px',
                    backgroundColor: activeTab === tab.toLowerCase() ? '#3b82f6' : '#e5e7eb',
                    color: activeTab === tab.toLowerCase() ? '#fff' : '#374151',
                    cursor: 'pointer',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              {platforms.map((platform) => (
                <div key={platform.name} style={{ textAlign: 'center', cursor: 'pointer' }}>
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '10px',
                      backgroundColor: '#f3f4f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '10px',
                    }}
                  >
                    <svg
                      style={{ width: '30px', height: '30px', color: '#3b82f6' }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={platform.icon} />
                    </svg>
                  </div>
                  <span style={{ fontSize: '12px', color: '#374151' }}>{platform.name}</span>
                </div>
              ))}
            </div>
          </section>

          <section style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ backgroundColor: '#3b82f6', color: '#fff', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>2</span>
              Name your project
            </h2>
            <div>
              <label htmlFor="project-name" style={{ display: 'block', fontSize: '14px', color: '#374151', marginBottom: '5px' }}>
                Project name
              </label>
              <input
                type="text"
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="my-awesome-project"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #d1d5db',
                  borderRadius: '5px',
                  fontSize: '14px',
                  outline: 'none',
                  boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                  transition: 'border-color 0.3s',
                }}
              />
            </div>
          </section>

          <button
            onClick={() => alert(`Creating project: ${projectName}`)}
            style={{
              backgroundColor: '#3b82f6',
              color: '#fff',
              fontWeight: 'bold',
              padding: '10px 20px',
              borderRadius: '5px',
              marginTop: '20px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
          >
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCreator;