import TeamModel from '../model/Team.model';
import { IMatches } from '../Interfaces/IMatches';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesModel, { OptionalIdMatches } from '../model/Matches.model';

export default class MatchesService {
  constructor(
    private matchesModel = new MatchesModel(),
    private teamsModel = new TeamModel(),
  ) {}

  async findAll(inProgress: string | undefined) : Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.matchesModel.findAll();

    switch (inProgress) {
      case 'true':
        return { status: 'successful', data: matches.filter((match) => match.inProgress === true) };
      case 'false':
        return { status: 'successful',
          data: matches.filter((match) => match.inProgress === false) };
      default:
        return { status: 'successful', data: matches };
    }
  }

  async finishMatch(id: IMatches['id']) : Promise<ServiceResponse<ServiceMessage>> {
    await this.matchesModel.finishMatch(id);
    return { status: 'successful', data: { message: 'Finished' } };
  }

  async updatedMatch(
    id: IMatches['id'],
    homeTeamGoals: IMatches['homeTeamGoals'],
    awayTeamGoals: IMatches['awayTeamGoals'],
  ) : Promise<ServiceResponse<ServiceMessage>> {
    await this.matchesModel.updatedMatch(id, homeTeamGoals, awayTeamGoals);
    return { status: 'successful', data: { message: 'Updated' } };
  }

  async createMatch(match: OptionalIdMatches) : Promise<ServiceResponse<OptionalIdMatches>> {
    if (match.homeTeamId === match.awayTeamId) {
      return {
        status: 'unprocessableEntity',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }

    const teams = await this.teamsModel.findAll();
    const teamsIds = teams.find((team) => team.id === match.homeTeamId);

    if (!teamsIds) {
      return { status: 'notFound', data: { message: 'There is no team with such id!' } };
    }

    const newMatch = await this.matchesModel.createMatch(match);
    return { status: 'created', data: newMatch };
  }
}
