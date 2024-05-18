import { Request, Response } from 'express';
import bcrytp from 'bcrypt';
import { AppDataSource } from '../db';
import { Exchange } from '../entities/exchange';

export const getExchangeCatalog = async (req: Request, res: Response) => {
    try {

        const exchangeCatalog = await AppDataSource
            .getRepository(Exchange)
            .createQueryBuilder('exchange')
            .getMany();

        return res.json({ exchangeCatalog, errorCode: 0 });

    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message, errorCode: 2 });
    }
}



export const createExchangeItem = async (req: Request, res: Response) => {

    try {
        const { image, name, points } = req.body;

        await AppDataSource
            .getRepository(Exchange)
            .createQueryBuilder('exchange')
            .insert()
            .into(Exchange)
            .values([
                { image, name, points }
            ])
            .execute();

        return res.json({ message: "producto creado", errorCode: 0 });

    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message, errorCode: 2 });
    }

}