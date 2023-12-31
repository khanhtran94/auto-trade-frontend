import axios from 'axios';
import Sign from "../type/Sign";

const API_BASE_URL = process.env.REACT_APP_API_URL;  // Thay đổi thành base URL của API

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const signApi = {
    getAll: () => api.get<Sign[]>('/sign'),
    getOne: (id: number) => api.get(`/sign/${id}`),
    create: (data: Sign) => api.post('/sign', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    }),
    update: (id: number, data: any) => api.put(`/sign/${id}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    }),
};
