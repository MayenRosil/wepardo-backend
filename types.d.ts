//En el req de las peticiones se guardan los datos obtenidos del token
declare namespace Express {
    export interface Request {
        userId: string;
        userUsername: string;
        userEmail: string;
    }
}