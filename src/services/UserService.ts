/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/data/models/User';
import * as fs from 'fs';
import * as admin from 'firebase-admin';
import qrcode from 'qrcode';
import { Storage } from '@google-cloud/storage';
import { MyUtils } from 'src/my-utils/my-utils';
import csvParser from 'csv-parser';
import { randomUUID } from 'crypto';
import { Association } from 'src/data/models/Association';

const mm = 'UserService';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    @InjectModel(Association.name)
    private associationModel: mongoose.Model<Association>,
  ) {}
  public convertExpressFileToString(expressFile: Express.Multer.File): string {
    const buffer = fs.readFileSync(expressFile.path);
    const fileString = buffer.toString('utf-8');
    return fileString;
  }

  async createUser(user: User): Promise<User> {
    console.log(`🟢🟢 create user: ${JSON.stringify(user)}`);
    const firebaseAuth = admin.auth();
    console.log('🟢🟢 createRequest  .... ');
    const storedPassword = user.password;

    try {
      let email = '';
      if (!user.email) {
        const name = `${user.firstName} ${user.lastName}`;
        const mName = name.replace(' ', '').toLowerCase();
        email = `${mName}${Date.now()}@kasietransie.com`;
        user.email = email;
        console.log(`🟢🟢 createUserAsync  .... email: ${email}`);
      } else {
        email = user.email;
      }
      const userRecord = await firebaseAuth.createUser({
        email: email,
        emailVerified: false,
        phoneNumber: user.cellphone,
        password: user.password,
        displayName: `${user.firstName} ${user.lastName}`,
        disabled: false,
      });

      console.log(`🟢🟢 userRecord from Firebase : ${userRecord.email}`);
      if (userRecord.uid) {
        const uid = userRecord.uid;
        user.userId = uid;
        const url = await MyUtils.createQRCodeAndUploadToCloudStorage(
          JSON.stringify(user),
          `${user.firstName}_${user.lastName}`.replace(' ', ''),
          1,
        );
        user.password = null;
        user.qrCodeUrl = url;
        const mUser = await this.userModel.create(user);
        //
        mUser.password = storedPassword;
        //   // const message = `Dear ${user.getName()},
        // \n\nYou have been registered with KasieTransie and the team is happy to send you the first time login password.
        // \nPlease login on the web with your email and the attached password but use your cellphone number to sign in on the phone.
        // \n\nThank you for working with GeoMonitor.
        // \nWelcome aboard!!
        // \nBest Regards,
        // \nThe KasieTransie Team
        // \ninfo@geomonitorapp.io\n\n`;

        //   // console.log('🟢🟢 sending email  .... ');
        //   // mailService.sendHtmlEmail(
        //   //   user.getEmail(),
        //   //   message,
        //   //   'Welcome to KasieTransie',
        //   // );
        console.log('🟢🟢 KasieTransie user created. ');
      } else {
        throw new Error(
          'userRecord.uid == null. We have a problem with Firebase, Jack!',
        );
      }
    } catch (e) {
      console.error(e);
      throw e;
    }

    return user;
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
    const ass = await this.associationModel.findOne({
      associationId: associationId,
    });
    const users: User[] = [];

    try {
      // Parse the JSON file and create User objects
      // Replace this logic with your own JSON parsing implementation
      const jsonData = fs.readFileSync(file.path, 'utf-8');
      const jsonUsers = JSON.parse(jsonData);

      jsonUsers.forEach(async (data: any) => {
        const user: User = await this.buildUser(data, ass);
        users.push(user);
      });

      const mUsers: User[] = [];
      // Save the parsed users to the database
      users.forEach(async (user) => {
        const u = await this.createUser(user);
        mUsers.push(u);
      });

      await this.userModel.create(mUsers);
      Logger.log(`${mUsers.length} users added`);
    } catch (error) {
      console.error('Failed to parse JSON string:', error);
    }
    return users;
  }
  public async importUsersFromCSV(
    file: Express.Multer.File,
    associationId: string,
  ): Promise<User[]> {
    // const stringContent = this.convertExpressFileToString(file);
    const ass = await this.associationModel.findOne({
      associationId: associationId,
    });
    const users: User[] = [];
    const mUsers: User[] = [];
    fs.createReadStream(file.path)
      .pipe(csvParser())
      .on('data', async (data: any) => {
        const user: User = await this.buildUser(data, ass);
        users.push(user);
      })
      .on('end', () => {
        // Save the parsed users to the database
        users.forEach(async (user) => {
          const u = await this.createUser(user);
          mUsers.push(u);
        });
      });

    Logger.log(`${mUsers.length} users added`);
    return mUsers;
  }
  private async buildUser(data: any, ass: Association): Promise<User> {
    const u = {
      userType: data.userType,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      cellphone: data.cellphone,
      userId: null,
      gender: null,
      countryId: ass.countryId,
      associationId: ass.associationId,
      associationName: ass.associationName,
      fcmToken: '',
      password: randomUUID.toString(),
      countryName: ass.countryName,
      dateRegistered: '',
      qrCodeUrl: null,
      profileUrl: null,
      profileThumbnail: null,
      _partitionKey: null,
      _id: null,
    };
    return u;
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
