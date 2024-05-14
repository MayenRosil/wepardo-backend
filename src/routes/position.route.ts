import { Router } from 'express';
import { createPosition } from '../controllers/position.controller';
import { validateToken } from '../libs/validateToken';

const router: Router = Router();

router.post('/', validateToken, createPosition);

export default router;