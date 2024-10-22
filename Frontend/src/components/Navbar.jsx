import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    // Set the authenticated user
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log('User signed out');
    }).catch((error) => {
      console.error('Sign out error', error);
    });
  };

  const getInitial = (name) => name ? name.charAt(0).toUpperCase() : '';

  return (
    <nav style={{ backgroundColor: '#1f2937', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold' }}>
        My Application
      </div>
      <div style={{ position: 'relative' }}>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => setDropdownOpen(!dropdownOpen)}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#3b82f6',
              color: '#fff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: '10px'
            }}>
              {user.photoURL ? (
                <img src={user.photoURL} alt="Profile" style={{ borderRadius: '50%', width: '100%', height: '100%' }} />
              ) : (
                getInitial(user.displayName || user.email)
              )}
            </div>
            <span style={{ color: '#fff' }}>{user.displayName || user.email}</span>
            <svg
              style={{ marginLeft: '10px', width: '12px', height: '12px', fill: '#fff' }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        ) : (
          <span style={{ color: '#fff' }}>Not logged in</span>
        )}

        {dropdownOpen && (
          <div style={{
            position: 'absolute',
            top: '50px',
            right: '0',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            zIndex: '10'
          }}>
            <ul style={{ listStyle: 'none', padding: '10px', margin: '0' }}>
              <li style={{ padding: '10px 20px', cursor: 'pointer', color: '#374151' }} onClick={() => console.log('Go to Dashboard')}>Go to Dashboard</li>
              <li style={{ padding: '10px 20px', cursor: 'pointer', color: '#374151' }} onClick={() => console.log('View Projects')}>View Projects</li>
              <li style={{ padding: '10px 20px', cursor: 'pointer', color: '#374151', borderTop: '1px solid #e5e7eb' }} onClick={handleLogout}>Log out</li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
