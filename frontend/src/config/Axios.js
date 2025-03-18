import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8081/api/v1/', // Adjust the port if needed
    withCredentials: true,
});

export const createAccount = (user) => api.post('/create-account', user);
export const addProperty = (property) => api.post('/add-property', property);
export const uploadImage = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload-image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};