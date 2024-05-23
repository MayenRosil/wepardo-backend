import { Router } from 'express';
import { getExchangeCatalog, createExchangeItem, exchangeProduct } from '../controllers/exchange.controller';
import { validateToken } from '../libs/validateToken';

const router: Router = Router();

router.get('/', validateToken, getExchangeCatalog);
router.post('/', validateToken, createExchangeItem);
router.patch('/', validateToken, exchangeProduct);

export default router;