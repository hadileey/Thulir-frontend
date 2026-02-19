const BASE_URL = 'https://thulir-backend-798k.onrender.com';

export const apiFetch = async (endpoint, options = {}) => {
    const token = localStorage.getItem('adminToken');
    
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        },
        ...options
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, defaultOptions);
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Network response was not ok');
    }
    
    return response.json();
};