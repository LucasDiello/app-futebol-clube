import { Request, Response } from 'express';
import TeamsService from '../service/Teams.Service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) {}

  async findAll(_req: Request, res: Response) {
    const { status, data } = await this.teamsService.findAll();
    res.status(mapStatusHTTP(status)).json(data);
  }

  async findByPk(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { status, data } = await this.teamsService.findByPk(id);
    res.status(mapStatusHTTP(status)).json(data);
  }
}
