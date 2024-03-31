import { Request, Response, NextFunction } from 'express';
import { User } from '../entities/User';
import { AppDataSource } from '../db';
import bcrytp from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signIn = async (req: Request, res: Response) => {

    try {
        const { username, password } = req.body;

        const user = await AppDataSource
        .getRepository(User)
        .createQueryBuilder('user')
        .where("user.username = :username", { username: username })
        .getOne();
 
        if(!user) return res.json({message: "Usuario no existe", errorCode: 1});

        const exist = await bcrytp.compare(password, user.password);
        if(!exist) return res.json({message: 'Credenciales incorrectas', errorCode: 1});

        const token: string = jwt.sign({
            username: username, id: user.id, email: user.email
        }, process.env.TOKEN_SECRET || 'generictoken',
        { expiresIn: 3600 })

        return res.json({token, errorCode: 0});
    } catch (error) {
        if(error instanceof Error)
            return res.status(500).json({message: error.message, errorCode: 2});
    }

}

