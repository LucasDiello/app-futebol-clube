import { Request, Response, Router } from 'express';
import TeamsController from '../controller/Teams.controller';

const teamsController = new TeamsController();

const router = Router();

router.get('/', (_req : Request, res : Response) => teamsController.findAll(_req, res));
router.get('/:id', (req : Request, res : Response) => teamsController.findByPk(req, res));

export default router;
