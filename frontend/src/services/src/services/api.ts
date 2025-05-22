import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://10.0.0.82:8080', 
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('@CesarBank:token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na requisição:', error);
    
    if (error.response && error.response.status === 401) {
      console.log('Usuário não autorizado, redirecionando para login...');
      AsyncStorage.removeItem('@CesarBank:token');
    }
    
    return Promise.reject(error);
  }
);

export default api;