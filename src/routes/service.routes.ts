import { Router } from 'express';
import { ServiceController } from '../controllers/service.controller';

const router = Router();
const serviceController = new ServiceController();

router.post('/', serviceController.createService);
// GET /api/services - Get all services
router.get('/', serviceController.getAllServices.bind(serviceController));

// GET /api/services/:id - Get a specific service by ID
router.get('/:id', serviceController.getServiceById.bind(serviceController));

export default router;