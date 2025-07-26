import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import sensorRoutes from './sensor.routes';

const router = Router();
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/sensor', sensorRoutes);
export default router;