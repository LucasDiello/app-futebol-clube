import { Request, Response, Router } from 'express';
import MatchesController from '../controller/Matches.controller';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (_req: Request, res: Response) => matchesController.findAll(_req, res));

export default router;
