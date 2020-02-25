import moment, { now } from 'moment';
import { CreateUserRequest, CreateUserResponse } from "./interfaces/create.interface";
import User from '../../entities/user.entity';
import UserRepository from './user.repository';
import { } from 'typeorm';


export default class UserService {

    /**
     * Create a new user
     * @author mcastrodevelopment
     * @param userData the required data
     * @return {Promise} { id: number, name: string, lastName: string, age: number, creationDate: Date }
     */
    static async createUser(userData: CreateUserRequest): Promise<CreateUserResponse> {
        console.info(`Service: START => ${this.createUser.name} <=`);
        console.log('User Data: ', userData);

        const user = new User();
        user.email = userData.email;
        user.status = 'ENABLED';
        user.age = userData.age;
        user.userType = userData.userType;
        user.name = userData.name;
        user.lastName = userData.lastName;
        user.creationDate = moment(now(), 'x').toDate();

        await UserRepository.saveTransaccion(user);

        console.info(`Service: END => ${this.createUser.name} <=`);
        return {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            age: user.age,
            userType: user.userType,
            userStatus: user.status,
            creationDate: moment(user.creationDate).format('DD-MM-YYYY').toString()
        }
    }

}