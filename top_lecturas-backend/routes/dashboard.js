import { Router } from 'express';
import { dashboard } from '../controllers/dashboard.js';
const dashboardRoutes = Router();

dashboardRoutes.get('/', dashboard);

export default dashboardRoutes;