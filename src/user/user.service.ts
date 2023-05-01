import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
    // return 'This action adds a new user';
  }

  findAll() {
    return this.usersRepository.find();
    // return `This action returns all user`;
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
    // return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
    // return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
    // return `This action removes a #${id} user`;
  }

  login(credentials: { username: string; password: string }) {
    return this.usersRepository.findOneOrFail({
      select: { id: true, name: true },
      where: { username: credentials.username, password: credentials.password },
    });
  }
}
