import { Body, Controller, Get, Post, Res, Session } from '@nestjs/common';
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
  async createUser(@Body() body: createUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('/auth/whoami')
  whoAmI(@Session() session: any) {
    return this.usersService.findOne(session.userId);
  }

  @Post('/auth/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('/auth/signin')
  async signIn(@Body() body: createUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user[0].id;

    return user;
  }
}
