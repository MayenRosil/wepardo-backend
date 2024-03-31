import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/User';
import { AppDataSource } from '../db';
import bcrytp from 'bcrypt';
import {sendEmail} from '../libs/sendEmail';

export const recoverPassword = async (req: Request, res: Response) => {

    try {
        const {email} = req.body;
        
        const randomNumber = Math.floor(Math.random() * 900000) + 100000;

        const user = await AppDataSource
        .getRepository(User)
        .createQueryBuilder('user')
        .where("user.email = :email", { email: email })
        .getOne();

        if(!user) return res.json({message: 'Email no corresponde a un usuario', errorCode: 1});

        await AppDataSource
            .getRepository(User)
            .createQueryBuilder('user')
            .update(User)
            .set({ recoveryCode: randomNumber })
            .where("id = :id", { id: user.id })
            .execute();
        
            
        sendEmail(user.email, user.username, randomNumber.toString());

        return res.json({verificationCode: randomNumber, message: "Se ha enviado un email", errorCode: 0});

    } catch (error) {
        if(error instanceof Error)
            return res.status(500).json({message: error.message, errorCode: 2});
    }

}

export const verifyPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {verificationCode, email} = req.body;

        const user = await AppDataSource
        .getRepository(User)
        .createQueryBuilder('user')
        .where("user.email = :email", { email: email })
        .andWhere("user.recoveryCode = :recoveryCode", { recoveryCode: verificationCode })
        .getOne();

        if(!user) return res.json({message: 'Codigo no valido', errorCode: 1});
        
        req.userId = (user.id);
        next();

        
    } catch (error) {
        if(error instanceof Error)
            return res.status(500).json({message: error.message, code: 2});
    }
}

export const updatePassword = async (req: Request, res: Response) => {
    try {
        const {password} = req.body;
        const hashedPassword = await bcrytp.hash(password, 10);

        await AppDataSource
            .getRepository(User)
            .createQueryBuilder('user')
            .update(User)
            .set({ password: hashedPassword })
            .where("id = :id", { id: req.userId })
            .execute();
        
        return res.json({message: "Clave actualizada", errorCode: 0});

        
    } catch (error) {
        if(error instanceof Error)
            return res.status(500).json({message: error.message, code: 2});
    }
}

