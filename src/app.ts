import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.route';
import passwordRoutes from './routes/password.route';
import employeeRoutes from './routes/employee.route';
import positionRoutes from './routes/position.route';
import departmentRoutes from './routes/department.route';
import logRecordRoutes from './routes/logrecord.route';
import exchangeRoutes from './routes/exchange.route';
import productRoutes from './routes/product.route';

const app: Application = express();

//settings
app.set('port', 3000)

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json({limit: '100mb'}));
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true, parameterLimit: 1000000 }));

//routes
app.use('/api/test', (req: Request, res: Response) => res.json({message: "Hola Mundo"}));
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/password', passwordRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/position', positionRoutes);
app.use('/api/department', departmentRoutes);
app.use('/api/logs', logRecordRoutes);
app.use('/api/exchange', exchangeRoutes);
app.use('/api/product', productRoutes);

export default app;