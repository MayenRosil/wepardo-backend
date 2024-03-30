import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.route';

const app: Application = express();

//settings
app.set('port', 3000)

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json())

//routes
app.use('/api/users', userRoutes);
app.use('/api/login', authRoutes);

export default app;