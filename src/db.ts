import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Department } from './entities/Department';
import { Position } from './entities/Position';
import { Employee } from './entities/Employee';
import { UserSubscriber } from './subscribers/UserSubscriber';
import { LogRecord } from './entities/LogRecord';
import { DepartmentSubscriber } from './subscribers/DepartmentSubscriber';
import { PositionSubscriber } from './subscribers/PositionSubscriber';
import { EmployeeSubscriber } from './subscribers/EmployeeSubscriber';
import { ExchangeSubscriber } from './subscribers/ExchangeSubscriber';
import { Exchange } from './entities/exchange';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: "50.17.111.232",
    port: 3306,
    username: "admin",
    password: "W3p@rd0$",
    database: "wepardo",
    synchronize: true,
    logging: true,
    entities: [User, Department, Position, Employee, LogRecord, Exchange],
    subscribers: [UserSubscriber, DepartmentSubscriber, PositionSubscriber, EmployeeSubscriber, ExchangeSubscriber],
    migrations: [],
});