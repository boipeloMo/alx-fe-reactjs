const UserProfile = (props) => {
  return (
    <div style={{ 
      border: '1px solid #ccc', 
      padding: '20px', 
      margin: '20px auto', 
      borderRadius: '10px', 
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9f9f9',
      maxWidth: '500px'
    }}>
      <h2 style={{ 
        color: '#3498db', 
        fontSize: '1.8rem', 
        marginBottom: '10px', 
        textAlign: 'center'
      }}>{props.name}</h2>
      <p style={{ margin: '5px 0' }}>
        Age: <span style={{ fontWeight: 'bold', color: '#e74c3c' }}>{props.age}</span>
      </p>
      <p style={{ margin: '5px 0', fontStyle: 'italic' }}>
        Bio: {props.bio}
      </p>
    </div>
  );
};

