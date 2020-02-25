import { transformAndValidate } from 'class-transformer-validator';
import { ClassType } from 'class-transformer/ClassTransformer';
import { BadRequestException } from '../../responses/Exceptions.index';

export async function schemaValidator(schema: ClassType<any>, json: string) {
    try {
        await transformAndValidate(schema, JSON.parse(json));
    } catch (error) {
        console.error(error);
        throw new BadRequestException('APP.COMMON.EXCEPTION.400');
    }
}