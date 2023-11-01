import { Request, Response, Router } from 'express';
import LoginController from '../controller/Login.controller';
import { authMiddleware } from '../middleware/auth/jwtValidate';

const loginController = new LoginController();

const router = Router();

router.post('/', (req: Request, res: Response) => loginController.login(req, res));
router.get(
  '/role',
  authMiddleware,
  (req: Request, res: Response) => loginController.loginRole(req, res),
);

export default router;
