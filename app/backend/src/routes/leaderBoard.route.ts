import { Request, Response, Router } from 'express';
import LeaderBoardController from '../controller/LeaderBoard.controller';

const leaderBoardController = new LeaderBoardController();

const router = Router();

router.get(
  '/home',
  (_req : Request, res : Response) => leaderBoardController.findAll(_req, res),
);

export default router;
