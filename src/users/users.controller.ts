import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('api/v1')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/auth/signup')
  createUser(@Body() body: createUserDto) {
    this.usersService.create(body.email, body.password);
  }
}
