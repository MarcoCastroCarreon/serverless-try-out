import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import User from '../entities/user.entity';

const port: number = process.env.DB_PORT ? +process.env.DB_PORT : 3306;
const username: string = process.env.DB_USERNAME;
const password: string = process.env.DB_PASSWORD;
const host: string = process.env.DB_HOST;
const database: string = process.env.DB_SCHEMA;
const entities: any[] = [User];
let connection: Connection = null;

export async function createFirstConnection() {
    console.info('Starting Connection...');
    connection = await createConnection({
        type: 'mysql',
        host,
        port,
        username,
        password,
        database,
        timezone: 'Z',
        entities,
        synchronize: false,
        bigNumberStrings: true,
        supportBigNumbers: true
    });
    console.info('Connection Status... ', connection.isConnected);
    return connection;
}