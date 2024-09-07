import { Router } from 'express';
import { createUser, getUsers, getUser } from '../controllers/user.controller';
import { validateToken } from '../libs/validateToken';

const router: Router = Router();

router.post('/', createUser);
router.get('/', validateToken, getUsers);
router.get('/profile/:id', validateToken, getUser);

export default router;