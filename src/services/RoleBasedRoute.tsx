import React from 'react';
import {Navigate } from 'react-router-dom';

const getUserRole = (): string | null => {
    const storedAuthData = localStorage.getItem('user');

    if (storedAuthData) {
        try {
            const authData = JSON.parse(storedAuthData);
            return authData?.roles ? authData.roles[0] : null;
        } catch (error) {
            console.error('Error parsing auth data:', error);
            return null;
        }
    }

    return null;
};


interface RoleBasedRouteProps {
    requiredRole: string;
    children: React.ReactNode;
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ requiredRole, children }) => {
    const userRole = getUserRole();
    console.log(userRole,requiredRole);
    if (userRole === requiredRole) {

        return <>{children}</>;
    } else {
        return <Navigate to="/unauthorized" />;
    }
};

export default RoleBasedRoute;
