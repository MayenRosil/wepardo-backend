import { Router } from 'express';
import { createDepartment, getDepartments } from '../controllers/department.controller';
import { validateToken } from '../libs/validateToken';

const router: Router = Router();

router.post('/', validateToken, createDepartment);
router.get('/', validateToken, getDepartments);

export default router;