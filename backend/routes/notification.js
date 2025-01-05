import express from 'express';
import notificationController from '../controllers/notificationController.js';

const router = express.Router();

router.get('/', notificationController.getNotifications)
router.put('/:id', notificationController.updateNotification)
router.put('/', notificationController.bulkUpdateNotifications)
router.delete('/:id', notificationController.deleteNotification)

export default router;