import express from 'express';
import { createRecruiter, getStaff, deleteStaff } from '../controllers/userController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

// Todas estas rutas requieren estar logueado y ser ADMIN
router.use(protect);
router.use(admin);

router.get('/', getStaff);
router.post('/recruiter', createRecruiter);
router.delete('/:id', deleteStaff);

export default router;
