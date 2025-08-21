export const API_BASE_URL = 'http://localhost:3000/api';

export const API_ENDPOINTS = {
    auth: {
        login: `${API_BASE_URL}/auth/login`,
        register: `${API_BASE_URL}/auth/register`,
        // logout: `${API_BASE_URL}/auth/logout`,
    },
    user: {
        profile: `${API_BASE_URL}/users/profile`,
        updateProfile: `${API_BASE_URL}/users/profile`,
        deleteUser: `${API_BASE_URL}/users/profile`
    },
}