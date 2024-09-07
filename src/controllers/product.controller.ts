import { Request, Response } from 'express';
import bcrytp from 'bcrypt';
import { User } from '../entities/User';
import { AppDataSource } from '../db';
import { Product } from '../entities/Product';



export const getProducts = async (req: Request, res: Response) => {
    try {

        const products = await AppDataSource
            .getRepository(Product)
            .createQueryBuilder('product')
            .getMany();

        return res.json({ products, errorCode: 0 });

    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message, errorCode: 2 });
    }

}