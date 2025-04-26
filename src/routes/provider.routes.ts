import { Router } from 'express';
import { ProviderController } from '../controllers/provider.controller';
import { authenticateJwt } from '../middleware/auth.middleware';

const router = Router();
const providerController = new ProviderController();

router.use(authenticateJwt as any); 

router.post('/', providerController.createProvider);
// GET /api/providers - Get all providers
router.get('/', providerController.getAllProviders.bind(providerController));

// GET /api/providers/:id - Get a specific provider by ID
router.get('/:id', providerController.getProviderById.bind(providerController));

export default router;