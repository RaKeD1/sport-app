import $api from '../http';
import { AxiosResponse } from 'axios';
import { ITrain } from '../models/ITrain';

export default class TrainService {
  static async newTrain(
    account_id: number,
    day_team: string,
    players: number[],
  ): Promise<AxiosResponse<ITrain[]>> {
    return $api.post<ITrain[]>('/team-train', {
      account_id,
      day_team,
      players,
    });
  }

  static async getTrain(
    account_id: number,
    date: string,
    team: string,
  ): Promise<AxiosResponse<ITrain[]>> {
    return $api.get<ITrain[]>(`/team-train?account_id=${account_id}&date=${date}&team=${team}`);
  }

  static async checkTeam(team: string): Promise<AxiosResponse<boolean>> {
    return $api.get<boolean>(`/team/${team}`);
  }
}
