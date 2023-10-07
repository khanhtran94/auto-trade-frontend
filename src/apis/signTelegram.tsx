import axios from 'axios';
import SignTelegram from "../type/SignTelegram";

const API_BASE_URL = process.env.REACT_APP_API_URL;  // Thay đổi thành base URL của API

console.log(process.env.REACT_APP_API_URL); // Output: https://api.example.com
console.log(process.env.REACT_APP_MAX_RESULTS); // Output: 50

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const signTelegramApi = {
    getAll: () => api.get<SignTelegram[]>('/sign_telegram'),
    getOne: (id: number) => api.get(`/sign_telegram/${id}`),
    create: (data: SignTelegram) => api.post('/sign_telegram', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    }),
    update: (id: number, data: any) => api.put(`/sign_telegram/${id}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    }),
};
