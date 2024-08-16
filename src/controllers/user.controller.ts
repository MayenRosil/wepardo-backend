import { Request, Response } from 'express';
import bcrytp from 'bcrypt';
import { User } from '../entities/User';
import { AppDataSource } from '../db';

export const createUser = async (req: Request, res: Response) => {

    try {
        const {username, password, email, company} = req.body;
        const hashedPassword = await bcrytp.hash(password, 10);

        if(!username || !password || !email || !company){
            return res.json({message: "Ingresar todos los campos", errorCode: 1});
        }

        await AppDataSource
            .getRepository(User)
            .createQueryBuilder('user')
            .insert()
            .into(User)
            .values([
                { username, password: hashedPassword, email, company }
            ])
            .execute();
        
        return res.json({message: "usuario creado", errorCode: 0});

    } catch (error) {
        if(error instanceof Error)
            return res.status(500).json({message: error.message, errorCode: 2});
    }

}

export const getUsers = async (req: Request, res: Response) => {
    try {

        const users = await AppDataSource
            .getRepository(User)
            .createQueryBuilder('user')
            .getMany();
        
        return res.json({users, errorCode: 0});
        
    } catch (error) {
        if(error instanceof Error)
            return res.status(500).json({message: error.message, errorCode: 2});
    }
}