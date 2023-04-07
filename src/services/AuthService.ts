import $api from '../http';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';

export default class AuthService {
  static async login(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/login', { login, password });
  }

  static async registration(
    login: string,
    password: string,
    fio: string,
    email: string,
    phone: string,
    group: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/registration', { login, password, fio, email, phone, group });
  }

  static async logout(): Promise<void> {
    return $api.post('/logout');
  }
}
