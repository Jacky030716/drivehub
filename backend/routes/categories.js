import express from 'express';
import categoryController from '../controllers/categoryController.js';
import requireAuth from '../middleware/auth.js';

const router = express.Router();

router.use(requireAuth); // This middleware will be executed for every route defined below

router.get('/', categoryController.getCategories)
router.post('/', categoryController.createCategory)

export default router;