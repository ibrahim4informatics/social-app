import axios from 'axios';


const fetcher = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,

})

export { fetcher }