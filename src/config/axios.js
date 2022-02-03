import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
});

clienteAxios.defaults.headers.common['Authorization'] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImVtYWlsIjoib29tYXI1NjU2NUBnbWFpbC5jb20iLCJuYW1lIjoiT21hciIsImlhdCI6MTY0Mzg2MDEzMywiZXhwIjoxNjQ0MDMyOTMzfQ.jfNKpg6Ms8birwibajhM_j2_GHL3anL4xFlXlXS4TPs";

export default clienteAxios;
