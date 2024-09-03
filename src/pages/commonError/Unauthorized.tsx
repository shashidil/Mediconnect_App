import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Unauthorized: React.FC = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/signin');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Unauthorized Access</h1>
            <p>You do not have permission to access this page.</p>
            <button
                onClick={handleRedirect}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                }}
            >
                Go to Sign In
            </button>
        </div>
    );
};
