
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import path from 'path';
import fs from 'fs';

export const uploadToS3 = async (rutaArchivoLocal: string, nombreArchivo: string): Promise<boolean> => {

    try {


        const filePath = path.join(rutaArchivoLocal);

        const s3Client = new S3Client({
            region: 'us-east-1',
            credentials: {
                accessKeyId: 'AKIAQ3EGRYYGABQVWFGS',
                secretAccessKey: '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'
            }
        });

        const fileContent = fs.readFileSync(filePath);

        const params = {
          Bucket: 's3://wepardo-resources/users/comparacion/',
          Key: nombreArchivo, // Nombre del archivo en S3
          Body: fileContent,
          ContentType: 'image/png' // Cambia esto si el tipo de archivo es diferente
        };

        const command = new PutObjectCommand(params);
        await s3Client.send(command);   
    
        return true;

    } catch (err) {
        return false;
    }


}