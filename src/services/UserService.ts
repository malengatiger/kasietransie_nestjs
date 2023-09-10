/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/models/User';

const mm = 'UserService';

@Injectable()
export class UserService {
  constructor(
    private configService: ConfigService,
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,

    @InjectModel(File.name)
    private fileModel: mongoose.Model<File>,
  ) {}

  public async createUser(user: User): Promise<User> {
    return null;
  }
  public async updateUser(user: User): Promise<User> {
    return null;
  }
  public async createUserQRCode(user: User): Promise<void> {
    return null;
  }
  public async importUsersFromJSON(
    file: File,
    associationId: string,
  ): Promise<User[]> {
    return [];
  }
  public async importUsersFromCSV(
    file: File,
    associationId: string,
  ): Promise<User[]> {
    return [];
  }
  public async getUserById(userId: string): Promise<User> {
    return null;
  }
  public async getUserByEmail(email: string): Promise<User> {
    return null;
  }
  public async getAssociationUsers(associationId: string): Promise<User[]> {
    return [];
  }
}
