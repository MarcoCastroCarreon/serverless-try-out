import { transformAndValidate } from 'class-transformer-validator';
import { ClassType } from 'class-transformer/ClassTransformer';
import { BadRequestException } from '../../responses/Exceptions.index';
import { ValidatorErrorInterfaceObject } from '../interfaces/validator.interface';

export async function schemaValidator(schema: ClassType<any>, json: string): Promise<void | Error> {
    try {
        await transformAndValidate(schema, JSON.parse(json));
    } catch (error) {
        console.error(error);
        throw new BadRequestException('APP.COMMON.EXCEPTION.400', { error: errorParser(error) });
    }
}

export async function errorParser(dataArray: Array<ValidatorErrorInterfaceObject>) {
    let errorPack: string[];
    console.log(dataArray);
    for (let data of dataArray) {
        if (data.children && data.children.length) errorParser(data.children);
        else errorPack.push(` Property ${data.property} rejected by ${Object.values(data.constraints)[0]}. `);
    }
    console.log('Error Pack: ', errorPack);
    return errorPack;
}