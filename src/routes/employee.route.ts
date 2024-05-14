import { Router } from 'express';
import { createEmployee, deleteEmployee, getEmployees } from '../controllers/employee.controller';
import { validateToken } from '../libs/validateToken';

const router: Router = Router();

router.post('/', validateToken, createEmployee);
router.get('/', validateToken, getEmployees);
router.delete('/:employee', validateToken, deleteEmployee);

export default router;