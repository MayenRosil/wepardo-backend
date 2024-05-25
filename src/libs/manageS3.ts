
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import path from 'path';
import fs from 'fs';

export const uploadToS3 = async (rutaArchivoLocal: string, nombreArchivo: string): Promise<boolean> => {

    try {

        
        const filePath = path.join(rutaArchivoLocal);

        console.log(filePath, 'aca esta la imagen')

        const s3Client = new S3Client({

            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY || '',
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
            },
            region: process.env.AWS_REGION || ''
        });

        const fileContent = fs.readFileSync(filePath);

        const params = {
          Bucket: 's3://wepardo-resources/users/almacen/',
          Key: nombreArchivo, // Nombre del archivo en S3
          Body: fileContent,
          ContentType: 'image/png' // Cambia esto si el tipo de archivo es diferente
        };

        const command = new PutObjectCommand(params);
        console.log(command, 'el comando')
        await s3Client.send(command);   
    
        return true;

    } catch (err) {
        return false;
    }


}