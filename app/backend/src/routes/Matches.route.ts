import { Request, Response, Router } from 'express';
import MatchesController from '../controller/Matches.controller';
import { authMiddleware } from '../middleware/auth/jwtValidate';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (_req: Request, res: Response) => matchesController.findAll(_req, res));
router.patch(
  '/:id/finish',
  authMiddleware,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);
router.patch(
  '/:id',
  authMiddleware,
  (req: Request, res: Response) => matchesController.updatedMatch(req, res),
);
router.post(
  '/',
  authMiddleware,
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);

export default router;
