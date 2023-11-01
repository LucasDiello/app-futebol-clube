import { IMatches } from '../Interfaces/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesModel from '../model/Matches.model';

export default class MatchesService {
  constructor(
    private matchesModel = new MatchesModel(),
  ) {}

  async findAll() : Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.matchesModel.findAll();
    return { status: 'successful', data: matches };
  }
}
