
import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginData { 
  cpf: string; 
  password: string; 
}

interface LoginResponse { 
  token: string; 
  user: { 
    id: number; 
    name: string; 
    cpf: string; 
  }; 
}

export const login = async (data: LoginData): Promise<LoginResponse> => { 
  const response = await api.post<LoginResponse>('/auth/login', data); 
  return response.data; 
};

export const saveToken = async (token: string): Promise<void> => {
  
  await AsyncStorage.setItem('@CesarBank:token', token);
  console.log('Token salvo:', token); 
};

export const getToken = async (): Promise<string | null> => {
  
  return await AsyncStorage.getItem('@CesarBank:token');
};

export const isAuthenticated = async (): Promise<boolean> => { 
  const token = await getToken(); 
  return !!token; 
};

export const logout = async (): Promise<void> => {

  await AsyncStorage.removeItem('@CesarBank:token');
  console.log('Logout realizado'); 
};