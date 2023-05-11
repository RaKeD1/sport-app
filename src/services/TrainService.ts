import $api from '../http';
import { AxiosResponse } from 'axios';
import { ITrain } from '../models/ITrain';
import { ActionType } from '../models/IActionType';

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
    day_team: string,
    date: string,
  ): Promise<AxiosResponse<ITrain[]>> {
    return $api.get<ITrain[]>(
      `/team-train?account_id=${account_id}&date=${date}&day_team=${day_team}`,
    );
  }

  static async checkTeam(team: string): Promise<AxiosResponse<boolean>> {
    return $api.get<boolean>(`/team/${team}`);
  }

  static async getActionsTypes(): Promise<AxiosResponse<ActionType[]>> {
    return $api.get<ActionType[]>(`/action-types`);
  }
}
