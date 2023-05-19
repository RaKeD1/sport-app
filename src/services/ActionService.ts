import $api from '../http';
import { AxiosResponse } from 'axios';
import { ITrain } from '../models/ITrain';
import { IAction } from '../models/IAction';

export default class ActionService {
  static async getTrainActions(day_team: string, date: string): Promise<AxiosResponse<IAction[]>> {
    return $api.get<IAction[]>(`/train-actions?date=${date}&day_team=${day_team}`);
  }
}
