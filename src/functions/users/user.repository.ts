import { EntityRepository, Repository, getConnection } from "typeorm";
import User from "../../entities/user.entity";


@EntityRepository(User)
export default class UserRepository extends Repository<User> {

    static async saveTransaccion(user: User) {
        console.info(`Repository: Start ${this.saveTransaccion.name}`);
        let connection = getConnection();
        let qRunner = connection.createQueryRunner();

        await qRunner.startTransaction();

        try {
            await qRunner.manager.save(user);
        } catch (error) {
            console.error('Rollback Error: ', error);
            await qRunner.rollbackTransaction();
        } finally {
            await qRunner.release();
        }
        console.info(`Repository: End ${this.saveTransaccion.name}`);
    }

}