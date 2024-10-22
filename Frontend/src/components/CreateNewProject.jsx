import React, { useState } from 'react';

const ProjectCreator = () => {
  const [activeTab, setActiveTab] = useState('popular');
  const [projectName, setProjectName] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const platforms = [
    { name: "Node.js", icon: "M5 8h10v8H5V8z" },
    { name: "Python", icon: "M8 4H4v4h4M16 4h-4v4h4" },
  ];

  const tabs = ['Popular', 'Browser', 'Server', 'Mobile', 'Desktop', 'Serverless', 'All'];
  const handleSubmit = () => {
    if (projectName && selectedPlatform) {
      onComplete(projectName, selectedPlatform);
    }
  };
  return (
    <div style={{ backgroundColor: '#f9fafb', padding: '20px',height:'100vh' }}>
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
                    <img src="{platform.icon}" alt="" />
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