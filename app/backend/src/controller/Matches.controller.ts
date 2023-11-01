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

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params as never;

    const { status, data } = await this.matchesService.finishMatch(Number(id));
    res.status(mapStatusHTTP(status)).json(data);
  }

  async updatedMatch(req: Request, res: Response) {
    const { id } = req.params as any;
    const { homeTeamGoals, awayTeamGoals } = req.body as any;

    const { status, data } = await this.matchesService.updatedMatch(
      Number(id),
      homeTeamGoals,
      awayTeamGoals,
    );
    res.status(mapStatusHTTP(status)).json(data);
  }

  async createMatch(req: Request, res: Response) {
    const dataBody = { ...req.body };

    const { status, data } = await this.matchesService.createMatch(dataBody);
    res.status(mapStatusHTTP(status)).json(data);
  }
}
