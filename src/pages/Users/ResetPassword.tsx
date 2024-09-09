import { useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token') || '';  // Provide a default value if token is null

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            // Only proceed if token is available (not null or empty)
            if (token) {
                const response = await axios.post(`http://localhost:8080/api/auth/reset-password?token=${encodeURIComponent(token)}&newPassword=${encodeURIComponent(newPassword)}`);
                setMessage(response.data);
            } else {
                setMessage('Invalid token.');
            }
        } catch (error) {
            setMessage('Error resetting password.');
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="password" 
                    placeholder="Enter new password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                />
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;
