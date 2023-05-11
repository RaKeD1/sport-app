import $api from '../http';
import { AxiosResponse } from 'axios';
import { IUser } from '../models/IUser';
import { ISelectUser } from '../models/ISelectUser';

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<ISelectUser[]>> {
    return $api.get<ISelectUser[]>('/users');
  }

  static fetchUser(id_account: number): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>('/user/' + id_account);
  }
}
