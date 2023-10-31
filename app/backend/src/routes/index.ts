import { Router } from 'express';
import teamsRouter from './Teams.route';
import loginRouter from './Login.route';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);

export default router;
