import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Logger } from '@nestjs/common';

import 'dotenv/config'; //
import { User } from 'src/models/User';
//
const mm = ' 🔵 UserService';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    console.log(`${mm} 🍎🍎 UserService.findAll ...`);
    const users = await this.userModel.find({});
    console.log(`${mm} 🍎🍎 UserService.findAll found: ${users.length}`);
    return users;
  }
  // eslint-disable-next-line prettier/prettier

  async createUser(user: User): Promise<User> {
    Logger.log(`${mm} ....................... createUser`, user);
    if (user) {
      const m = await this.userModel.create(user);
      Logger.log(`${mm} result of create: `, m);

      return m;
    } else {
      Logger.log(`${mm} the fucking user coming in is null`);
      throw new Error(`🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎 user is null`);
    }
    return null;
  }
}
