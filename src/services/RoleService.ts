import $api from '../http';
import { AxiosResponse } from 'axios';

export default class RoleService {
  static fetchRoles(): Promise<AxiosResponse<string[]>> {
    return $api.get<string[]>('/roles');
  }
  static giveRoles(role: string, users: number[]): Promise<AxiosResponse<number>> {
    return $api.post<number>('/roles', { role, users });
  }
}
