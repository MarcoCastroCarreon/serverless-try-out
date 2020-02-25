import { UserType, UserStatus } from "../types/user.types";

export interface CreateUserRequest {
    name: string;
    lastName: string;
    age: number;
    userType: UserType;
    email: string;
    password: string;
}

export interface CreateUserResponse {
    id: number;
    name: string;
    lastName: string;
    age: number;
    userType: UserType;
    userStatus: UserStatus;
    creationDate: string;
}