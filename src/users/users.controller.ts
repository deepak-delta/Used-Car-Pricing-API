import { Body, Controller, Post, Res } from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { SerializeInterceptor } from '../interceptors/serializr.interceptor';
import { AuthService } from './auth.service';

@Controller('api/v1')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('/auth/signup')
  createUser(@Body() body: createUserDto) {
    return this.authService.signup(body.email, body.password);
  }

  @Post('/auth/signin')
  signIn(@Body() body: createUserDto) {
    return this.authService.signin(body.email, body.password);
  }
}
