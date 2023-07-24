import axios from 'axios';

const baseURL = 'http://localhost:3001/';
const axiosInstance = axios.create({
        baseURL,
        timeout: 10000, 
            'Content-Type': 'application/json',
        },
    );


export {axiosInstance};