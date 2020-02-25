import { Response } from 'lambda-proxy-utils';
import { HttpStatusCode } from "../global/enums/http.status.enum";

export default class ResponseCode {

    static Created(data: any, headers?: any) {
        return this.parser(HttpStatusCode.CREATED, data, headers);
    }

    static Ok(data: any, headers?: any) {
        return this.parser(HttpStatusCode.OK, data, headers);
    }

    static NoContent() {
        return this.parser(HttpStatusCode.NO_CONTENT);
    }

    static parser(statusCode: HttpStatusCode, data?: any, headers?: any) {
        data = data || {};
        headers = headers || {};
        headers = {
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Expose-Headers': 'X-Total-Count, Authorization',
            ...headers
        }
        return new Response({ statusCode, cors: true, headers }).send(JSON.stringify(data));
    }
}

