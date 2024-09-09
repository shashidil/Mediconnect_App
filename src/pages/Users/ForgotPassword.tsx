import { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            // Send the email as a query parameter in the URL
            const response = await axios.post(`http://localhost:8080/api/auth/forgot-password?email=${encodeURIComponent(email)}`);
            setMessage(response.data);
        } catch (error) {
            setMessage('Something went wrong.');
        }
    };

    return (
        <div>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPassword;
