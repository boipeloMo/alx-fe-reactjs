import React from 'react';

/**
 * @function UserProfile
 * @description A functional component that displays user information passed via props.
 * @param {object} props - The component's props.
 * @param {string} props.name - The name of the user.
 * @param {number} props.age - The age of the user.
 * @param {string} props.bio - A short biography of the user.
 */
function UserProfile(props) {
  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      margin: '1rem',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{props.name}</h2>
      <p style={{ color: '#4b5563', marginBottom: '0.25rem' }}>Age: {props.age}</p>
      <p style={{ fontStyle: 'italic', color: '#6b7280' }}>Bio: {props.bio}</p>
    </div>
  );
}

export default UserProfile;
