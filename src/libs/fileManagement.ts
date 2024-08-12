import * as fs from 'fs';
import * as path from 'path';
import { exec, spawn } from 'child_process';


// Verifica si el archivo existe en la ruta
export const searchLocalFile = async (nombreArchivo: string) :Promise<boolean> => {

    const rutaCarpeta: string = process.env.RUTA_CARPETA_ALMACEN || '';
    
    // Construye la ruta completa del archivo
    const rutaArchivo: string = path.join(rutaCarpeta, nombreArchivo);

    let existe:boolean = false;
    await fs.promises.access(rutaArchivo, fs.constants.F_OK)
    .then(() => {
      console.log(`El archivo ${nombreArchivo} existe en la carpeta ${rutaCarpeta}`);
      existe = true;
    })
    .catch((err) => {
      console.error(`El archivo ${nombreArchivo} no existe en la carpeta ${rutaCarpeta}`);
    });
    return existe;
}

export const validateFacial = async (username: string) : Promise<boolean> => {

    const rutaArchivo: string = path.join(__dirname, '/compara.py')
    
    // Comando para ejecutar el script Python
    const comando = `python3 /home/wepardo/compara.py ${process.env.RUTA_CARPETA_COMPARACION}${username}.png`;

    return new Promise((resolve, reject) => {
        //const comando = 'python script.py'; // Comando para ejecutar el script de Python
    
        exec(comando, (error, stdout, stderr) => {
          if (error) {
            reject(error); // Rechazar la promesa en caso de error
          } else if (stderr) {
            reject(new Error(stderr)); // Rechazar la promesa si hay mensajes de error en stderr
          } else {
            console.log(stdout)
            let result = stdout.split("\n")
            const resultado = result[result.length -2].includes('True'); // Convertir la salida a un valor booleano
            
            console.log(stdout.split("\n"))
            resolve(resultado); // Resolver la promesa con el valor booleano
          }
        });
      });
}
