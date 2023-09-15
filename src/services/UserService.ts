/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/data/models/User';
import * as fs from 'fs';
import { Express } from 'express';

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
  public convertExpressFileToString(expressFile: Express.Multer.File): string {
    const buffer = fs.readFileSync(expressFile.path);
    const fileString = buffer.toString('utf-8');
    return fileString;
  }

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
    file: Express.Multer.File,
    associationId: string,
  ): Promise<User[]> {
    const jsonString = this.convertExpressFileToString(file);
    try {
      const jsonObject = JSON.parse(jsonString);
      console.log(jsonObject);
    } catch (error) {
      console.error('Failed to parse JSON string:', error);
    }
    return [];
  }
  public async importUsersFromCSV(
    file: Express.Multer.File,
    associationId: string,
  ): Promise<User[]> {
    const stringContent = this.convertExpressFileToString(file);
    return [];
  }
  public async getUserById(userId: string): Promise<User> {
    const user = await this.userModel.findOne({ userId: userId });
    return user;
  }
  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }
  public async getAssociationUsers(associationId: string): Promise<User[]> {
    return [];
  }
}
