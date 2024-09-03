import React from "react";
import { useNavigate } from "react-router-dom";

export const InvalidURL: React.FC = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/signin');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Invalid URL</h1>
            <p>The URL you have accessed is not valid.</p>
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
                Go to Mediconnect App
            </button>
        </div>
    );
};
