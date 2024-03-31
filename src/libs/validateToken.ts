import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IPayload {
    id: string
    iat: number
    exp: number
    username: string
    email: string
}

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const headerToken = req.headers['authorization'];
        
        if(!headerToken || !headerToken.startsWith('Bearer')) return res.status(400).json({message: 'Acceso incorrecto'});
 
        const bearerToken = headerToken.split(" ")[1];
        const payload = jwt.verify(bearerToken, process.env.TOKEN_SECRET || 'generictoken') as IPayload;
       
        req.userId = parseInt(payload.id);
        req.userEmail = payload.email;
        req.userUsername = payload.username;
        
        next();
    } catch (error) {
        if(error instanceof Error)
            return res.status(500).json({message: error.message});
    }

}