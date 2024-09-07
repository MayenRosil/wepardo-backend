import { Router } from 'express';
import { getProducts } from '../controllers/product.controller';
import { validateToken } from '../libs/validateToken';

const router: Router = Router();

router.get('/', validateToken, getProducts);

export default router;