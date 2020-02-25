import { handlerException } from "../../responses/Exceptions.index";
import { schemaValidator } from "../validators/schema.validator";


export const squemaValidator = (config: any) => {
    return ({
        before: async (handler: any, next: any) => {
            console.info(`Middleware: Start squemaValidator`);
            if (!handler.event.body) throw new Error('Body request is empty');
            console.log('Body: ==>', handler.event.body);
            console.log('Schema: ==>', config['schema']);
            await schemaValidator(config['schema'], handler.event.body);
            console.info(`Middleware: End schemaValidator`);
        },
        onError: (handler: any, next: any) => {
            console.error('onError: ', handler.error);
            const e = handlerException(handler.error);
            return handler.callback(null, e);
        }
    })
}