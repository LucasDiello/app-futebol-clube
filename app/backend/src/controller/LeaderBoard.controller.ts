import { Request, Response } from 'express';
import LeaderBoardService from '../service/LeaderBoard.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderBoardController {
  private leaderBoardService = new LeaderBoardService();

  async findAllHome(_req: Request, res : Response) {
    const { status, data } = await this.leaderBoardService.findAllHome();
    res.status(mapStatusHTTP(status)).json(data);
  }

  async findAllAway(_req: Request, res : Response) {
    const { status, data } = await this.leaderBoardService.findAllAway();
    res.status(mapStatusHTTP(status)).json(data);
  }

  async findAll(_req: Request, res : Response) {
    const { status, data } = await this.leaderBoardService.findAll();
    res.status(mapStatusHTTP(status)).json(data);
  }
}
