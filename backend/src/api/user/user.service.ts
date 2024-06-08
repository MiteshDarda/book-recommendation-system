import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  //$ ------------------------------------------- HELPER: getOne -------------------------------------------
  getOne(email: string) {
    const user = this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
    return user;
  }
  //$ ------------------------------------------- HELPER: getOneById -------------------------------------------
  getOneById(id: string) {
    const user = this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
    return user;
  }
}
