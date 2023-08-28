import { IUser, IUserCreate, IUserSearch, IUserUpdate } from './user.interface'
import { hashSync, genSaltSync } from 'bcryptjs'
import { AppDataSource } from '../../app';
import { User } from '../../models/user/user.entity';
import { CustomError } from '../../common/error';
import to from 'await-to-js';

export class UserService {

    public userRepository: any;
    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    hash(password: string) {
        return hashSync(password, genSaltSync(8))
    }

    async create(data: IUserCreate): Promise<User> {

        try {
            const hashedPassword = this.hash(data.password);

            data.password = hashedPassword;

            const [errorUser, user] = await to(
                this.userRepository.findOne({
                    where: [
                        { email: data.email },
                        [
                            { document: { value: data.document.value } }
                        ]
                    ]
                })
            );

            if (errorUser) {
                throw new CustomError(`Query failed, ${errorUser}`, 400);
            }

            if (user) {
                throw new CustomError("El usuario ya existe", 406);
            }

            try {
                const newUser = await this.userRepository.save(data);
                console.log('register', newUser);
                return newUser;
            } catch (error) {
                console.error('Error registering:', error);
                throw new CustomError(`Query failed, ${error.message}`, 400);
            }
        } catch (error) {
            return error.message;
        }

    }

    async one(data: IUserSearch):Promise<User> {

        try {
            const user = await this.userRepository.findOne({
                where: { ...data } 
            });
    
            if (!user) {
                throw new CustomError(`User not found`, 404);
            }
    
            return user;
        } catch (error) {
            throw new CustomError(`Query failed, ${error.message}`, 400);
        }

    }

}