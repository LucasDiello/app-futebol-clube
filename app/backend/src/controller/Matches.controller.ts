import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchesService from '../service/Matches.Service';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) {}

  async findAll(_req : Request, res : Response) {
    const { status, data } = await this.matchesService.findAll();
    res.status(mapStatusHTTP(status)).json(data);
  }
}
