import { DataSource } from 'typeorm';
import { User } from './entities/User';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: "50.17.111.232",
    port: 3306,
    username: "admin",
    password: "W3p@rd0$",
    database: "wepardo",
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
});