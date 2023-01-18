import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../domain/users.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User> {
        return this.usersRepository.findOne({where: {id}});
    }

    async create(user: User): Promise<void> {
        await this.usersRepository.save(user);
    }

    async update(id: number, user: User) {
        const existedUser = await this.findOne(id);
        if ( existedUser ) {
            await this.usersRepository.update(id, user);
        }
    }

    async remove(id: number): Promise<DeleteResult> {
        return await this.usersRepository.delete(id);
    }
}
