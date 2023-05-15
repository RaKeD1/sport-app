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

  static async addAction(
    id_train: number,
    id_action_type: number,
    name_action: string,
    result: string,
    condition: string,
    score: number,
  ): Promise<AxiosResponse<ITrain[]>> {
    return $api.post<ITrain[]>('/action', {
      id_train,
      id_action_type,
      name_action,
      result,
      condition,
      score,
    });
  }

  static async checkTeam(team: string): Promise<AxiosResponse<boolean>> {
    return $api.get<boolean>(`/team/${team}`);
  }

  static async getTeams(): Promise<AxiosResponse<string[]>> {
    return $api.get<string[]>(`/teams`);
  }

  static async getActionsTypes(): Promise<AxiosResponse<ActionType[]>> {
    return $api.get<ActionType[]>(`/action-types`);
  }
}
