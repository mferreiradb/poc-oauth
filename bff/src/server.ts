import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { container } from 'tsyringe';

import { HttpClient } from './services/httpClient.js';
import { OAuthService } from './services/oauthService.js';
import { authRoutes } from './modules/auth/routes/auth.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';

// Register services in the container
container.registerSingleton('HttpClient', HttpClient);
container.registerSingleton('OAuthService', OAuthService);

const app = express();
const PORT = process.env.PORT || 3002;

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'bff',
    timestamp: new Date().toISOString() 
  });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 BFF Server running on http://localhost:${PORT}`);
});

export { app };
