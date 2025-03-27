import axios from 'axios';
import { Platform } from 'react-native';


const BASE_URL = Platform.OS === 'android'
  ? process.env.EXPO_PUBLIC_BASE_SERVER_URLAndroid   // Android emulator must use 10.0.2.2
  : process.env.EXPO_PUBLIC_BASE_SERVER_URL; 


/*
const getHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token') ?? ''}`,
});
*/

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    timeout: 40000,
});

const request = async (method, endpoint, data = {}) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
        };

        let resp;
        if (method.toLowerCase() === 'delete') {
            resp = await axiosInstance.delete(endpoint, {
                data: data,
                headers: headers
            });
        } else if (method.toLowerCase() === 'get') {
            resp = await axiosInstance.request({
                method: method,
                url: endpoint,
                params: data, // Use 'params' for GET requests
                headers: headers
            });
        } else {
            resp = await axiosInstance.request({
                method: method,
                url: endpoint,
                data: data,
                headers: headers
            });
        }
        return { data: resp.data, status: resp.status };
    } catch (error) {
        console.error(error);
        return { data: error.response?.data, status: error.response?.status };
    }
};

export default request