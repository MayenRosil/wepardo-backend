import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import app from './app';
import { AppDataSource } from './db';

async function main(){
    try {
        
        await AppDataSource.initialize()
            .then(() => {
                console.log('Database connected');
                app.listen(app.get('port'));
                console.log('Server is listening on port ', app.get('port'));
            });

    } catch (error) {
        console.error(error);
    }
}

main();