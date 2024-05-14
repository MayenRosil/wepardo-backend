import { Request, Response } from 'express';
import bcrytp from 'bcrypt';
import { User } from '../entities/User';
import { AppDataSource } from '../db';
import { Employee } from '../entities/Employee';

export const createEmployee = async (req: Request, res: Response) => {

    try {
        const { firstName, secondName, firstLastName, secondLastName, CUI, NIT, user, position } = req.body;

        await AppDataSource
            .getRepository(Employee)
            .createQueryBuilder('employee')
            .insert()
            .into(Employee)
            .values([
                { firstName, secondName, firstLastName, secondLastName, CUI, NIT, user, position }
            ])
            .execute();

        return res.json({ message: "empleado creado", errorCode: 0 });

    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message, errorCode: 2 });
    }

}

export const getEmployees = async (req: Request, res: Response) => {
    try {

        const employees = await AppDataSource
            .getRepository(Employee)
            .createQueryBuilder('employee')
            .innerJoinAndSelect('employee.user', 'user')
            .innerJoinAndSelect('employee.position', 'position')
            .getMany();

        return res.json({ employees, errorCode: 0 });

    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message, errorCode: 2 });
    }
}


export const deleteEmployee = async (req: Request, res: Response) => {



    try {

        const { employee } = req.params;

        await AppDataSource
            .createQueryBuilder()
            .delete()
            .from(Employee)
            .where("id = :id", { id: employee })
            .execute();


        return res.json({ message: "empleado eliminado", errorCode: 0 });

    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message, errorCode: 2 });
    }
}