// routes/index.ts
import productsRouter from './product';
import categoryRouter from './category';
import { Router } from 'express';

const router: Router = Router();

router.use('/products', productsRouter);
router.use('/category', categoryRouter);

export default router;
