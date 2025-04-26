import { Router } from 'express';
import { ServiceController } from '../controllers/service.controller';
import { authenticateJwt } from '../middleware/auth.middleware';

const router = Router();
const serviceController = new ServiceController();

router.use(authenticateJwt as any); 

router.post('/', serviceController.createService);
// GET /api/services - Get all services
router.get('/', serviceController.getAllServices.bind(serviceController));

// GET /api/services/:id - Get a specific service by ID
router.get('/:id', serviceController.getServiceById.bind(serviceController));

export default router;