import { Router } from 'express';
import { recoverPassword, verifyPassword, updatePassword } from '../controllers/password.controller';

const router: Router = Router();

router.patch('/recover', recoverPassword);
router.patch('/verify', verifyPassword, updatePassword);

export default router;