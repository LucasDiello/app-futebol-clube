import { Request, Response, Router } from 'express';
import LeaderBoardController from '../controller/LeaderBoard.controller';

const leaderBoardController = new LeaderBoardController();

const router = Router();

router.get(
  '/home',
  (_req : Request, res : Response) => leaderBoardController.findAllHome(_req, res),
);
router.get(
  '/away',
  (_req : Request, res : Response) => leaderBoardController.findAllAway(_req, res),
);

router.get('/', (_req : Request, res : Response) => leaderBoardController.findAll(_req, res));

export default router;
