import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {notification} from "antd";

const SessionCheck: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const sessionExpiration = localStorage.getItem("sessionExpiration");
        const isSessionExpired = sessionExpiration ? new Date().getTime() > parseInt(sessionExpiration) : true;

        if (isSessionExpired) {
            localStorage.removeItem("user");
            localStorage.removeItem("userId");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("sessionExpiration");

            notification.warning({
                message: 'Session Expired',
                description: 'Your session has expired. Please sign in again.',
                duration: 3,
            });

            navigate('/signin');
        }
    }, [navigate]);

    return null;
};

export default SessionCheck;
