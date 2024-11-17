import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://laara-api-dev-3rc4fb3npa-ew.a.run.app',
    headers: { 
       'x-app-id': '3a2f3e5b-4a89-4fcb-a7e1-31421c7a6344'
    },
});

export default apiClient;
