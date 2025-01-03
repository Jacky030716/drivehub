import express from 'express';
import categoryController from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', categoryController.getCategories)
router.post('/', categoryController.createCategory)

export default router;