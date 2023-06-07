import $api from '../http';
import { AxiosResponse } from 'axios';
import { IUser } from '../models/IUser';
import { ISelectUser } from '../models/ISelectUser';
import { ITrain } from '../models/ITrain';
import { UserTrains } from '../components/UserTrainings';
import { UsersFetch } from '../pages/Players';

export default class UserService {
  static fetchUsers(page: number, limit: number): Promise<AxiosResponse<UsersFetch>> {
    return $api.get<UsersFetch>('/users/' + `?page=${page}&limit=${limit}`);
  }

  static fetchSelectUsers(): Promise<AxiosResponse<ISelectUser[]>> {
    return $api.get<ISelectUser[]>('/select-users');
  }

  static fetchUser(id_account: number): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>('/user/' + id_account);
  }

  static fetchUserStat(id_account: number): Promise<AxiosResponse<ITrain>> {
    return $api.get<ITrain>('/stat/' + id_account);
  }

  static fetchUserTrains(
    id_account: number,
    page: number,
    limit: number,
  ): Promise<AxiosResponse<UserTrains>> {
    return $api.get<UserTrains>('/trains/' + id_account + `?page=${page}&limit=${limit}`);
  }

  static updateUser(id_user: number, userData: Partial<IUser>): Promise<AxiosResponse<IUser>> {
    return $api.put<IUser>('/user/' + id_user, userData);
  }

  static updateUserPhoto(data: FormData): Promise<AxiosResponse<string>> {
    return $api.put<string>('/photo', data);
  }

  static deleteUserPhoto(id: number): Promise<AxiosResponse<string>> {
    return $api.delete<string>(`/photo/${id}`);
  }

  static deleteUser(id: number): Promise<AxiosResponse<IUser>> {
    return $api.delete<IUser>(`/user/${id}`);
  }
}
