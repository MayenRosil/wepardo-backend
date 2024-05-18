import { Router } from 'express';
import { getExchangeCatalog, createExchangeItem } from '../controllers/exchange.controller';
import { validateToken } from '../libs/validateToken';

const router: Router = Router();

router.get('/', validateToken, getExchangeCatalog);
router.post('/', validateToken, createExchangeItem);

export default router;