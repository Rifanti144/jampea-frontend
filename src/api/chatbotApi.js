import axios from './axios';

export const sendMessage = async (message) => {
    const response = await axios.post('/chat', {
        message: message
    });

    return response.data;
};