import { Router } from 'express';
import { signIn } from '../controllers/auth.controller';

const router: Router = Router();

router.post('/', signIn);

export default router;