import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ITeams from '../Interfaces/ITeams';
import TeamModel from '../model/Team.model';
import { ITeamsModel } from '../Interfaces/ITeamsModel';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamsModel = new TeamModel(),
  ) {}

  async findAll() : Promise<ServiceResponse<ITeams[]>> {
    const teams = await this.teamsModel.findAll();
    return { status: 'successful', data: teams };
  }
}
