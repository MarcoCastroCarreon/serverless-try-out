const middy = require('middy');
import { APIGatewayProxyEvent, APIGatewayProxyHandler, Context, APIGatewayProxyResult } from 'aws-lambda';
import { handlerException } from '../../common/responses/Exceptions.index';
import { CreateUserRequest, CreateUserResponse } from './interfaces/create.interface';
import UserService from './user.service';
import ResponseCode from '../../common/responses/Responses.index';
import { createDatabaseConnection } from '../../common/global/middlewares/startDatabaseConnection.middleware';

/**
 * @api {post} /users Create user
 * @apiName CreateUser
 * @apiGroup User
 *
 * 
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "id": 0,
 *          "name": "Mark",
 *          "lastName": "Zuckenberg",
 *          "userType": "ADMIN",
 *          "age": 35,
 *          "creationDate": "16-02-2020"
 *      }
 * @apiError Error-Response:
 *      HTTP/1.1 409 Conflict
 *      {
 *          "code": "APP_1",
 *          "message": "name and lastname are required"
 *      }
 */

const originalHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    context.callbackWaitsForEmptyEventLoop = false;
    console.info(`Handler: Start ${context.functionName}`);
    try {
        const requestBody: CreateUserRequest = JSON.parse(event.body);
        const response: CreateUserResponse = await UserService.createUser(requestBody);
        console.info(`Handler: End ${context.functionName}`);
        return ResponseCode.Created(response);
    } catch (errors) {
        console.error('Handler Error: ==> ', errors);
        return handlerException(errors);
    }
}

export const handler = middy(originalHandler)
    .use(createDatabaseConnection());