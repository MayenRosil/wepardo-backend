import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Department } from './entities/Department';
import { Position } from './entities/Position';
import { Employee } from './entities/Employee';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: "50.17.111.232",
    port: 3306,
    username: "admin",
    password: "W3p@rd0$",
    database: "wepardo",
    synchronize: true,
    logging: true,
    entities: [User, Department, Position, Employee],
    subscribers: [],
    migrations: [],
});