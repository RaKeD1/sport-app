import $api from '../http';
import { AxiosResponse } from 'axios';
import { IUser } from '../models/IUser';
import { ISelectUser } from '../models/ISelectUser';
import { ITrain } from '../models/ITrain';

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<ISelectUser[]>> {
    return $api.get<ISelectUser[]>('/users');
  }

  static fetchUser(id_account: number): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>('/user/' + id_account);
  }

  static fetchUserStat(id_account: number): Promise<AxiosResponse<ITrain>> {
    return $api.get<ITrain>('/stat/' + id_account);
  }

  static updateUser(id_account: number, userData: Partial<IUser>): Promise<AxiosResponse<IUser>> {
    return $api.put<IUser>('/user/' + id_account, userData);
  }

  static updateUserPhoto(data: FormData): Promise<AxiosResponse<string>> {
    return $api.put<string>('/photo', data);
  }

  static deleteUserPhoto(id: number): Promise<AxiosResponse<string>> {
    return $api.delete<string>(`/photo/${id}`);
  }
}
