import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    }
    return (
        <button className="bg-red-700 p-4 text-sm text-white" onClick={() => handleLogout()}>Logout</button>
    )
}