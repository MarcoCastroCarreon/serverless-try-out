import { IsDefined, IsString, IsNotEmpty, IsOptional } from "class-validator";


export class CreateUserRequestSchema {

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    lasName: string;
}