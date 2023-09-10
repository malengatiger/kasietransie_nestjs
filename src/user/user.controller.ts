import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/models/user';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}
  @Get('getAllUsers')
  async getAllUsers(): Promise<User[]> {
    console.log('UserController: 🔵 🔵 getAllUsers ....');
    return await this.userService.findAll();
  }
  @Post('createUser')
  async createUser(@Body() user: User): Promise<User> {
    console.log(`UserController: 🔵 🔵 ... createUser .... ${user}`);
    if (user) {
      const mu = await this.userService.createUser(user);
      return mu;
    }
    throw new Error(' 🍎 🍎 🍎 🍎 🍎  ... User is null, fuck!');
  }
}
