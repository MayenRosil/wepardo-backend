import { Request, Response } from 'express';
import bcrytp from 'bcrypt';
import { AppDataSource } from '../db';
import { Exchange } from '../entities/Exchange';
import { User } from '../entities/User';

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

export const exchangeProduct = async (req: Request, res: Response) => {
    try {
        const { points, user } = req.body;

        //Obtener el usuario a canjear
        const findedUser = await AppDataSource
        .getRepository(User)
        .createQueryBuilder('user')
        .where('user.id = :id', { id: user })
        .getOne();

        if(!findedUser)  return res.json({ message: "Usuario no existe", errorCode: 1 });

        if(findedUser.exchangePoints == 0)  return res.json({ message: "Usuario no cuenta con puntos suficientes", errorCode: 1 });

        if(findedUser.exchangePoints < points)  return res.json({ message: "Usuario no cuenta con puntos suficientes", errorCode: 1 });

        //Actualizar los puntos del usuario despues de canjear
        await AppDataSource
            .getRepository(User)
            .createQueryBuilder('user')
            .update(User)
            .set({ exchangePoints: findedUser.exchangePoints - points })
            .where("id = :id", { id: user })
            .execute();

        return res.json({ message: "Producto canejado, se restaron puntos del usuario", errorCode: 0 });

    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message, errorCode: 2 });
    }

}