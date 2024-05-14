import { Router } from 'express';
import { createDepartment } from '../controllers/department.controller';
import { validateToken } from '../libs/validateToken';

const router: Router = Router();

router.post('/', validateToken, createDepartment);

export default router;