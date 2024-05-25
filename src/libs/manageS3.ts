
import { S3Client, PutObjectCommand, PutObjectCommandOutput, ObjectCannedACL } from '@aws-sdk/client-s3';
import path from 'path';
import fs from 'fs';

export const uploadToS3 = async (rutaArchivoLocal: string, nombreArchivo: string): Promise<boolean> => {

    try {

        
        const filePath = path.join(rutaArchivoLocal);

        console.log(filePath, 'aca esta la imagen')

        if (!fs.existsSync(filePath)) {
            console.error(`El archivo no existe en la ruta: ${filePath}`);
            return false;
          }

        const s3Client = new S3Client({

            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY || '',
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
            },
            region: process.env.AWS_REGION || ''
        });

        const fileContent = fs.readFileSync(filePath);
        console.log(fileContent, 'el contenido')

        const params = {
          Bucket: 'wepardo-resources',
          Key: 'users/almacen/MayenRosil', // Nombre del archivo en S3
          Body: fileContent,
          ContentType: 'image/png', // Cambia esto si el tipo de archivo es diferente
          ACL: 'public-read' as ObjectCannedACL
        };


        const command = new PutObjectCommand(params);
        console.log(command, 'el comando');
        console.log('-----');
    
        const response: PutObjectCommandOutput = await s3Client.send(command);
        console.log(response, 'la respuesta');
    
        console.log('Archivo subido exitosamente a S3');
        return true;

    } catch (err) {
        return false;
    }


}