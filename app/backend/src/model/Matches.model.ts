import SequelizeTeams from '../database/models/SequelizeModel';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { IMatches, IMatchesModel } from '../Interfaces/IMatches';

export type OptionalIdMatches = Omit<IMatches, 'id' | 'inProgress'>;

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

  async finishMatch(id: IMatches['id']) {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updatedMatch(
    id: IMatches['id'],
    homeTeamGoals: IMatches['homeTeamGoals'],
    awayTeamGoals: IMatches['awayTeamGoals'],
  ) {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  async createMatch(match: OptionalIdMatches) {
    const newMatch = await this.model.create({
      homeTeamId: match.homeTeamId,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamId: match.awayTeamId,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: true,
    });
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = newMatch.dataValues;
    return {
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
    };
  }
}
