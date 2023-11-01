import { Request, Response } from 'express';
import UsersModel from '../model/Users.model';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LoginController {
  constructor(
    private loginModel = new UsersModel(),
  ) {}

  async login(req: Request, res: Response) {
    const { status, data } = await this.loginModel.login(req.body);
    res.status(mapStatusHTTP(status)).json(data);
  }

  async loginRole(req: Request & { userId? : number }, res: Response) {
    const id = Number(req.userId);

    const { status, data } = await this.loginModel.loginRole(id);
    res.status(mapStatusHTTP(status)).json(data);
  }
}
