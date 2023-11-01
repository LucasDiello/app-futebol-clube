import SequelizeTeams from '../database/models/SequelizeModel';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { IMatches, IMatchesModel } from '../Interfaces/IMatches';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;

  async findAll() : Promise<IMatches[]> {
    const matches = await this.model.findAll({
      attributes: ['id',
        'homeTeamId',
        'homeTeamGoals', 'awayTeamId', 'awayTeamGoals', 'inProgress'],
      include: [
        {
          model: SequelizeTeams,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: SequelizeTeams,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return matches;
  }
}
