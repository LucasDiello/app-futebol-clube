import { IMatches } from '../Interfaces/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesModel from '../model/Matches.model';

export default class MatchesService {
  constructor(
    private matchesModel = new MatchesModel(),
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
}
