import axios from 'axios';
import LocalStorageService from './localStorageService';

const localStorageService = LocalStorageService.getService();
const cancelTokenSource = axios.CancelToken.source();

const axiosApiInstance = axios.create({
  baseURL: 'https://movietickets.azurewebsites.net/api/',
});

axiosApiInstance.interceptors.request.use(
  (config) => {
    if (config.url === 'users/login' || config.url === 'users/register') {
      return config;
    } else {
      const token = localStorageService.getAccessToken();
      config.headers['Authorization'] = 'Bearer ' + token;
      return config;
    }
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    Promise.reject(error);
  }
);

export { axiosApiInstance, cancelTokenSource };
