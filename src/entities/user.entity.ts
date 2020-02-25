import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { UserType, UserStatus } from "../functions/users/types/user.types";


@Entity({ name: 'USER' })
export default class User extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'ID', type: 'bigint' })
    id: number;

    @Column({ name: 'EMAIL', nullable: false, unique: true, type: 'varchar' })
    email: string;

    @Column({ name: 'STATUS', nullable: false, type: 'varchar' })
    status: UserStatus;

    @Column({ name: 'AGE', nullable: false, type: 'integer' })
    age: number;

    @Column({ name: 'USER_TYPE', nullable: false, type: 'varchar' })
    userType: UserType;

    @Column({ name: 'NAME', nullable: false })
    name: string;

    @Column({ name: 'LAST_NAME', nullable: true })
    lastName: string;

    @Column({ name: 'CREATION_DATE', nullable: false })
    creationDate: Date;
}