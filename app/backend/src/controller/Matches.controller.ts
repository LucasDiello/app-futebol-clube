import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchesService from '../service/Matches.Service';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) {}

  async findAll(req: Request, res: Response) {
    const { inProgress } = req.query as never;

    const { status, data } = await this.matchesService.findAll(inProgress);
    res.status(mapStatusHTTP(status)).json(data);
  }
}
