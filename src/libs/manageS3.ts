
import { S3Client, PutObjectCommand, PutObjectCommandOutput, ObjectCannedACL } from '@aws-sdk/client-s3';
import { RekognitionClient, CompareFacesCommand } from '@aws-sdk/client-rekognition';
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

        const params1 = {
          Bucket: 'wepardo-resources',
          Key: 'users/almacen/MayenRosil', // Nombre del archivo en S3
          Body: fileContent,
          ContentType: 'image/png', // Cambia esto si el tipo de archivo es diferente
        };

        const params2 = {
            Bucket: 'wepardo-resources',
            Key: 'users/comparacion/MayenRosil', // Nombre del archivo en S3
            Body: fileContent,
            ContentType: 'image/png', // Cambia esto si el tipo de archivo es diferente
          };


        const command1 = new PutObjectCommand(params1);
        console.log(command1, 'el comando');
        const response1: PutObjectCommandOutput = await s3Client.send(command1);
        console.log(response1, 'la respuesta');

        

        const command2 = new PutObjectCommand(params2);
        console.log(command2, 'el comando');
        const response2: PutObjectCommandOutput = await s3Client.send(command2);
        console.log(response2, 'la respuesta');
    
        console.log('Archivo subido exitosamente a S3');
        return true;

    } catch (err) {
        return false;
    }


}




export const compareFaces = async (): Promise<void> => {
    try {

        const rekognitionClient = new RekognitionClient({
            region: process.env.AWS_REGION,
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
            }
          });

      const params = {
        SourceImage: {
          S3Object: {
            Bucket: 'wepardo-resources',
            Name: 'users/almacen/MayenRosil.png'
          }
        },
        TargetImage: {
          S3Object: {
            Bucket: 'wepardo-resources',
            Name: 'users/comparacion/MayenRosil.png'
          }
        },
        SimilarityThreshold: 90
      };
  
      const command = new CompareFacesCommand(params);
      const response = await rekognitionClient.send(command);
  
      if (response.FaceMatches && response.FaceMatches.length > 0) {
        console.log('Los rostros coinciden:', response.FaceMatches);
      } else {
        console.log('Los rostros no coinciden o la similitud es menor al umbral.');
      }
  
    } catch (err) {
      console.error('Error comparando rostros:', err);
    }
  };