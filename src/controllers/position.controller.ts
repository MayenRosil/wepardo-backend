import { Request, Response } from 'express';
import bcrytp from 'bcrypt';
import { User } from '../entities/User';
import { AppDataSource } from '../db';
import { Position } from '../entities/Position';


export const createPosition = async (req: Request, res: Response) => {

    try {
        const {positionName, salary, department} = req.body;

        await AppDataSource
            .getRepository(Position)
            .createQueryBuilder('position')
            .insert()
            .into(Position)
            .values([
                { positionName, salary, department }
            ])
            .execute();
        
        return res.json({message: "puesto creado", errorCode: 0});

    } catch (error) {
        if(error instanceof Error)
            return res.status(500).json({message: error.message, errorCode: 2});
    }

}

export const getPositions = async (req: Request, res: Response) => {
    try {

        const positions = await AppDataSource
            .getRepository(Position)
            .createQueryBuilder('position')
            .innerJoinAndSelect('position.department', 'department')
            .getMany();

        return res.json({ positions, errorCode: 0 });

    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message, errorCode: 2 });
    }

}