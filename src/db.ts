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
import { ExchangeHistory } from './entities/ExchangeHistory';
import { Product } from './entities/Product';
import { AttendanceHistory } from './entities/AttendanceHistory';
import { Role } from './entities/Role';
import { Company } from './entities/Company';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "",
    database: "wepardo",
    synchronize: true,
    logging: true,
    entities: [User, Department, Position, Employee, LogRecord, ExchangeHistory, Product, AttendanceHistory, Role, Company],
    subscribers: [UserSubscriber, DepartmentSubscriber, PositionSubscriber, EmployeeSubscriber, ExchangeSubscriber],
    migrations: [],
});