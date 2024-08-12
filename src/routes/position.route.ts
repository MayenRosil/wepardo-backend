import { Router } from 'express';
import { createPosition, getPositions } from '../controllers/position.controller';
import { validateToken } from '../libs/validateToken';

const router: Router = Router();

router.post('/', validateToken, createPosition);
router.get('/', validateToken, getPositions);

export default router;