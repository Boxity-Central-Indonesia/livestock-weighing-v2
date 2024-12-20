import axios from "axios";
import { getToken } from "./token";



const baseUrl = import.meta.env.VITE_API_URL

const apiClient = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers:{
        'Content-Type': 'application/json',
    },
})

apiClient.interceptors.request.use(config => {
    const token = getToken()
    if(token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})


export default apiClient