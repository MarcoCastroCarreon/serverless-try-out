import _ from 'lodash';
import { HttpStatusCode } from "../global/enums/http.status.enum";
import errorTemplates from '../../../resources/exception.template.code.json';
import { Response } from 'lambda-proxy-utils';

export class AppException extends Error {
    public statusCode: number = null;
    public code: string = null;
    public mergeVariables: any = null;
    public message: string = null;

    constructor() { super(); }

}

export class BadRequestException extends AppException {
    constructor(code: string, mergeVariables?: any) {
        super();
        this.name = 'BadRequestError';
        this.statusCode = HttpStatusCode.BAD_REQUEST;
        this.code = code;
        this.mergeVariables = mergeVariables;
    }
}

export class NotFoundException extends AppException {
    constructor(code: string, mergeVariables?: any) {
        super();
        this.name = 'NotFoundError';
        this.statusCode = HttpStatusCode.NOT_FOUND;
        this.code = code;
        this.mergeVariables = mergeVariables;
    }
}

export class ConflictException extends AppException {
    constructor(code: string, mergeVariables?: any) {
        super();
        this.name = 'ConflictError';
        this.statusCode = HttpStatusCode.CONFLICT;
        this.code = code;
        this.mergeVariables = mergeVariables;
    }
}

export class UnauthorizedException extends AppException {
    constructor(code: string, mergeVariables?: any) {
        super();
        this.name = 'UnauthorizedError';
        this.statusCode = HttpStatusCode.UNAUTHORIZED;
        this.code = code;
        this.mergeVariables = mergeVariables;
    }
}

export class InternalServerException extends AppException {
    constructor(code: string, mergeVariables?: any) {
        super();
        this.name = 'InternalServerError';
        this.statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
        this.code = code;
        this.mergeVariables = mergeVariables;
    }
}

export class ForbiddenException extends AppException {
    constructor(code: string, mergeVariables?: any) {
        super();
        this.name = 'ForbiddenError';
        this.statusCode = HttpStatusCode.FORBIDDEN;
        this.code = code;
        this.mergeVariables = mergeVariables;
    }
}

/**
 * Returns a exception error
 * @param appException the exception class
 * @return {Response} exception object
 */
export const handlerException = (appException: AppException): Response => {
    const { statusCode, code, mergeVariables } = appException;
    delete appException.statusCode;

    const textTemplate = _.template(errorTemplates[code]);
    const message = !mergeVariables ? textTemplate() : textTemplate(mergeVariables);

    return new Response({ cors: true, statusCode }).send({
        code,
        message
    });
}