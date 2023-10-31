import { Request, Response, Router } from 'express';
import LoginController from '../controller/Login.controller';

const loginController = new LoginController();

const router = Router();

router.post('/', (req : Request, res : Response) => loginController.login(req, res));

export default router;
