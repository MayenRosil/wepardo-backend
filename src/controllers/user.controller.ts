import { Request, Response } from 'express';
import bcrytp from 'bcrypt';
import { User } from '../entities/User';
import { AppDataSource } from '../db';

export const createUser = async (req: Request, res: Response) => {

    try {
        const {username, password, email} = req.body;
        const hashedPassword = await bcrytp.hash(password, 10);

        await AppDataSource
            .getRepository(User)
            .createQueryBuilder('user')
            .insert()
            .into(User)
            .values([
                { username, password: hashedPassword, email }
            ])
            .execute();
        
        return res.json({message: "usuario creado"});

    } catch (error) {
        if(error instanceof Error)
            return res.status(500).json({message: error.message});
    }

}

export const getUsers = async (req: Request, res: Response) => {
    try {

        const users = await AppDataSource
            .getRepository(User)
            .createQueryBuilder('user')
            .getMany();
        
        return res.json(users);
        
    } catch (error) {
        if(error instanceof Error)
            return res.status(500).json({message: error.message});
    }
}