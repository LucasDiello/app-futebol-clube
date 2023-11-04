import { Router } from 'express';
import teamsRouter from './Teams.route';
import loginRouter from './Login.route';
import matchesRouter from './Matches.route';
import leaderBoardRouter from './leaderBoard.route';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderBoardRouter);

export default router;
