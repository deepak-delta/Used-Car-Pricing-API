import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // See if email in use
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('Email already in use');
    }

    // Hash the users password
    const hash = bcrypt.hashSync(password, 15);

    // Create a new user and save it
    const user = await this.usersService.create(email, hash);
    // Return the user
    return user;
  }
  async signin(email: string, password: string) {
    const users = await this.usersService.find(email);

    if (!users.length) {
      throw new NotFoundException('user not found');
    }
    const result = bcrypt.compareSync(password, users[0].password);
    return users;
  }
}
