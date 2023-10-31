import { ITeamsModel } from '../Interfaces/ITeamsModel';
import SequelizeTeams from '../database/models/SequelizeModel';
import ITeams from '../Interfaces/ITeams';

export default class TeamModel implements ITeamsModel {
  private model = SequelizeTeams;

  async findAll() : Promise<ITeams[]> {
    const teams = await this.model.findAll();
    return teams.map(({ id, teamName }) => ({
      id,
      teamName,
    }));
  }

  async findByPk(id: ITeams['id']) : Promise<ITeams | null> {
    const team = await this.model.findByPk(id);
    if (team === null) return null;
    const { teamName } = team;

    return {
      id,
      teamName,
    };
  }
}
