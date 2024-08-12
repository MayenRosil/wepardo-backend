import { Router } from 'express';
import { getRecords } from '../controllers/logrecord.controller';
import { validateToken } from '../libs/validateToken';

const router: Router = Router();

router.get('/', validateToken, getRecords);

export default router;