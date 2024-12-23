import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    console.log('axios.js request : ', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (res) => {
    console.log('axios.js response : ', res);
    return res;
  },
  (error) => {
    return Promise.reject({
      status: error.response.status,
      success: error.response.data.success,
      message: error.response.data.message,
    });
  }
);

export default instance;
