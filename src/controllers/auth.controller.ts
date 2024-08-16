import { Request, Response, NextFunction } from 'express';
import { User } from '../entities/User';
import { AppDataSource } from '../db';
import bcrytp from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

import { searchLocalFile, validateFacial } from '../libs/fileManagement';

export const signIn = async (req: Request, res: Response) => {

    try {
        const { username, password, company } = req.body;

        const user = await AppDataSource
            .getRepository(User)
            .createQueryBuilder('user')
            .where("user.username = :username", { username: username })
            .andWhere("user.employee.company = :company", { company: company })
            .getOne();

        if (!user) return res.json({ message: "Usuario no existe o no pertenece a la empresa", errorCode: 1 });

        const {active} = user;
        if(!active) return res.json({ message: "Usuario inactivo", errorCode: 1 });

        const exist = await bcrytp.compare(password, user.password);
        if (!exist) return res.json({ message: 'Credenciales incorrectas', errorCode: 1 });

        const token: string = jwt.sign({
            username: username, id: user.id, email: user.email, company: company
        }, process.env.TOKEN_SECRET || 'generictoken',
        //    { expiresIn: 3600 }
        )


        return res.json({ token, errorCode: 0, imageExist: await searchLocalFile(`${username}.png`) });
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message, errorCode: 2 });
    }

}

export const uploadImage = async (req: Request, res: Response) => {
    try {
        const { base64image, username, exist } = req.body;

        // Decodificar la imagen base64
        const base64Image: string = base64image.split(';base64,').pop()!;
        const decodedImage: Buffer = Buffer.from(base64Image, 'base64');

        // Guardar la imagen decodificada en una carpeta local
        const nombreArchivo: string = `${username}.png`; // Nombre de archivo único basado en la fecha y hora actual
        const rutaArchivo: string = exist ? path.join(`${process.env.RUTA_CARPETA_COMPARACION}`, nombreArchivo) : path.join(`${process.env.RUTA_CARPETA_ALMACEN}/`, nombreArchivo); // Ruta de la carpeta local donde se guardará la imagen

        await fs.writeFile(rutaArchivo, decodedImage, (error) => {
            if (error) {
                console.log(error)
                return res.json({ message: 'Error al guardar la imagen', errorCode: 1 });
            } else {
                if (!exist) return res.json({ message: "Imagen guardada", errorCode: 0 });

                
                return res.json({ message: "Imagenes coinciden", errorCode: 0 });

                // Validar coincidencia facial
                validateFacial(username)
                    .then((resultado) => {
                        console.log('Resultado del script de Python:', resultado);
                        if (!resultado) return res.json({ message: "Imagenes no coinciden", errorCode: 1 });

                        return res.json({ message: "Imagenes coinciden", errorCode: 0 });
                    })
                    .catch((error) => {
                        console.error('Error al ejecutar el script de Python:', error);
                        return res.json({ message: 'Error al comparar las imagenes ' + error, errorCode: 1 });
                    });

            }
        });

    } catch (error) {
        console.error(error)
        if (error instanceof Error)
            return res.status(500).json({ message: error.message, errorCode: 2 });
    }
}

