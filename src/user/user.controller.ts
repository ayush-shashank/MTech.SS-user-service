import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('createUser')
  async create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @MessagePattern('findAllUser')
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() id: number) {
    return this.userService.findOneById(id);
  }

  @MessagePattern('updateUser')
  update(@Payload() updateObj: { id: number; updateUserDto: UpdateUserDto }) {
    return this.userService.update(updateObj.id, updateObj.updateUserDto);
  }

  @MessagePattern('removeUser')
  remove(@Payload() id: number) {
    return this.userService.remove(id);
  }

  @MessagePattern('login')
  login(@Payload() credentials: { username: string; password: string }) {
    return this.userService.login(credentials);
  }
}
