import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { container } from 'tsyringe';

import { InMemoryDatabase } from './services/database.js';
import { authRoutes } from './modules/auth/routes/auth.routes.js';
import { userRoutes } from './modules/user/routes/user.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';

// Register services in the container
container.registerSingleton('Database', InMemoryDatabase);

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export { app };
