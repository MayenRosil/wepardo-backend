import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.route';
import passwordRoutes from './routes/password.route';

const app: Application = express();

//settings
app.set('port', 3000)

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json())

//routes
app.use('/api/test', (req: Request, res: Response) => res.json({message: "Hola Mundo"}));
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/password', passwordRoutes);

export default app;