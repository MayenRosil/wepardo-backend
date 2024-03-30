import { Router } from 'express';
import { createUser, getUsers } from '../controllers/user.controller';
import { validateToken } from '../libs/validateToken';

const router: Router = Router();

router.post('/', createUser);
router.get('/', validateToken, getUsers);

export default router;