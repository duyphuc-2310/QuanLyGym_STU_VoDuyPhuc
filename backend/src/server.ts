import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';

import { initSocket } from './config/socket.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { startCronJobs } from './jobs/cron.jobs.js';

// Import Route Handlers
import authRoutes from './modules/auth/auth.routes.js';
import leadsRoutes from './modules/leads/leads.routes.js';
import packagesRoutes from './modules/packages/packages.routes.js';
import membershipsRoutes from './modules/memberships/memberships.routes.js';
import checkinsRoutes from './modules/checkins/checkins.routes.js';
import bookingsRoutes from './modules/bookings/bookings.routes.js';
import metricsRoutes from './modules/metrics/metrics.routes.js';
import analyticsRoutes from './modules/analytics/analytics.routes.js';
import paymentsRoutes from './modules/payments/payments.routes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Khởi tạo Socket.io
initSocket(server, FRONTEND_URL);

// Middlewares
app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'CITYGYM Management API',
    time: new Date().toISOString(),
  });
});

// Đăng ký các module API
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/packages', packagesRoutes);
app.use('/api/memberships', membershipsRoutes);
app.use('/api/check-ins', checkinsRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/metrics', metricsRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/payments', paymentsRoutes);

// Error Middleware
app.use(errorHandler);

// Khởi động máy chủ & Cron Jobs
server.listen(PORT, () => {
  console.log(`🚀 [CITYGYM Backend API] Server đang chạy tại: http://localhost:${PORT}`);
  startCronJobs();
});

