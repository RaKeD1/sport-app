import $api from '../http';
import { AxiosResponse } from 'axios';
import { IUser } from '../models/IUser';

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('/users');
  }

  static fetchUser(id_account: number): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>('/user/' + id_account);
  }
}
