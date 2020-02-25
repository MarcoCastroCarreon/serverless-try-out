import { createFirstConnection } from "../../connection"
import { handlerException } from "../../responses/Exceptions.index";
import { getConnection } from "typeorm";

/**
 * Create new connection to database
 * @author mcastrodevelopment
 */
export const createDatabaseConnection = () => {
    return ({
        before: async (handler, next) => {
            console.info('Middleware: Start createDatabaseConnection...');
            await createFirstConnection();
            console.info('Middleware: End createDatabaseConnection...');
        },
        after: async () => {
            console.info('Middleware: Start closeDatabaseConnection...');
            const connection = await getConnection();
            await connection.close();
            console.info('Middleware: End closeDatabaseConnection...');
        },
        onError: (handler: any, next: any) => {
            console.log('OnError: ', handler.error);
            const e = handlerException(handler.error);
            return handler.callback(null, e);
        }
    })
}