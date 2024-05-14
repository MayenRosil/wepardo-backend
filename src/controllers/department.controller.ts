import { Request, Response } from 'express';
import bcrytp from 'bcrypt';
import { User } from '../entities/User';
import { AppDataSource } from '../db';
import { Department } from '../entities/Department';


export const createDepartment = async (req: Request, res: Response) => {

    try {
        const { departmentName } = req.body;

        await AppDataSource
            .getRepository(Department)
            .createQueryBuilder('department')
            .insert()
            .into(Department)
            .values([
                { departmentName }
            ])
            .execute();

        return res.json({ message: "departamento creado", errorCode: 0 });

    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message, errorCode: 2 });
    }

}