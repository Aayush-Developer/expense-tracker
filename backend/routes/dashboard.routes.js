import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {getDashboardOverview,getDashboardAnalytics} from '../controller/dashboard.controller.js'
const router=express.Router()

router.get('/',authMiddleware,getDashboardOverview)
router.get(
    "/analytics",
    authMiddleware,
    getDashboardAnalytics
);
export default  router