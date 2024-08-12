import { Request, Response } from 'express';
import bcrytp from 'bcrypt';
import { User } from '../entities/User';
import { AppDataSource } from '../db';
import { LogRecord } from '../entities/LogRecord';

export const getRecords = async (req: Request, res: Response) => {
    try {

        const records = await AppDataSource
            .getRepository(LogRecord)
            .createQueryBuilder('logRecord')
            .getMany();

        return res.json({ records, errorCode: 0 });

    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message, errorCode: 2 });
    }
}

