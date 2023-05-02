import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserOrder } from './entities/user-order.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(UserOrder)
    private usersOrderRepository: Repository<UserOrder>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOneById(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByUsername(username: string) {
    return this.usersRepository.findOneBy({ username });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }

  login(credentials: { username: string; password: string }) {
    return this.usersRepository.findOneOrFail({
      select: { id: true, name: true },
      where: { username: credentials.username, password: credentials.password },
    });
  }

  updateOrder(userOrders: { id: number; orders: number[] }) {
    const orders = userOrders.orders.map((order) => {
      return { userId: userOrders.id, orderId: order };
    });
    this.usersOrderRepository.save(orders);
  }
}
