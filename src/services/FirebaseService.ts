/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initializeApp } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import * as admin from 'firebase-admin';
import { GoogleAuth } from 'google-auth-library';
import axios from 'axios';
import { Constants } from 'src/my-utils/constants';
import { MyUtils } from 'src/my-utils/my-utils';

const mm = '🍑 🍑 🍑 FirebaseService 🍑 ';
const firebaseConfig = {
  apiKey: 'AIzaSyAdOBFxPS1TacnK5OZTU6VxOQ20Bq8Cyrg',
  authDomain: 'thermal-effort-366015.firebaseapp.com',
  projectId: 'thermal-effort-366015',
  storageBucket: 'thermal-effort-366015.appspot.com',
  messagingSenderId: '79998394043',
  appId: '1:79998394043:web:95361b63452944add6139e',
  measurementId: 'G-70WYNB4CN7',
};

@Injectable()
export class MyFirebaseService {
  public async initializeFirebase(): Promise<void> {
    Logger.log(`${mm} ... Initializing Firebase ...`);
    const app1 = admin.initializeApp(firebaseConfig);
    Logger.log(`${mm} ... Firebase initialized: name: ${app1.name}   ...`);
    return null;
  }
  async sendInitializationMessage() {

    const date = MyUtils.formatISOStringDate(new Date().toISOString(),  'en');
    const message: admin.messaging.Message = {
      topic: Constants.admin,
      data: {
        message:
          '🍑🍑 Kasie Transie Backend Server (Node/NestJS) started OK! 🅿️ 🅿️ 🅿️',
        date: date,
      },
      notification: {
        title: 'Kasie Transie Backend',
        body: `Kasie Transie is running good! : ${date}
        )}🅿️ 🅿️ 🅿️`,
      },
    };

    try {
      const response = await admin.messaging().send(message);
      Logger.log(
        `${mm} 🅿️ 🅿️ 🅿️ Successfully sent FCM message: \n🚺 🚺 🚺 ${JSON.stringify(
          message,
        )} \n🚺 🚺 🚺 FCM response: ${response}`,
      );
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}
