import { Router } from 'express';
import { signIn, uploadImage } from '../controllers/auth.controller';

const router: Router = Router();

router.post('/', signIn);
router.post('/uploadImage', uploadImage);

export default router;