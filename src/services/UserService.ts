/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/data/models/User';
import * as fs from 'fs';
import { Express } from 'express';
import * as admin from 'firebase-admin';
import qrcode from 'qrcode';
import { Storage } from '@google-cloud/storage';
import { MyUtils } from 'src/my-utils/my-utils';

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
        MyUtils.createQRCodeAndUploadToCloudStorage(
          JSON.stringify(user),
          `${user.firstName} ${user.lastName}`,
          1,
        );
        user.password = null;

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
  async createQRCodeAndUploadToCloudStorage(input: string): Promise<string> {
    try {
      // Create QR code image as a data URL
      const qrCodeDataURL = await qrcode.toDataURL(input);

      // Upload QR code image to Google Cloud Storage
      const storage = new Storage();
      const bucketName = 'your-bucket-name';
      const fileName = 'qr-code.png';
      const fileBuffer = Buffer.from(
        qrCodeDataURL.replace(/^data:image\/\w+;base64,/, ''),
        'base64',
      );
      await storage.bucket(bucketName).file(fileName).save(fileBuffer, {
        contentType: 'image/png',
      });

      // Get the download URL of the uploaded file
      const file = storage.bucket(bucketName).file(fileName);
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + 24 * 60 * 60 * 1000, // URL expires in 24 hours
      });

      return url;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create QR code and upload to Cloud Storage.');
    }
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
