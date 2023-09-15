/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initializeApp } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import * as admin from 'firebase-admin';
import { GoogleAuth } from 'google-auth-library';
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
    // const app = initializeApp();
    //
    // Use the authenticated client to initialize the Firebase Admin SDK
    const app1 = admin.initializeApp(firebaseConfig);
    //
    Logger.log(`${mm} ... Firebase initialized: name: ${app1.name}   ...`);

    return null;
  }
  async sendFCMMessage() {
    const message: admin.messaging.Message = {
      topic: 'adminTopic',
      data: {
        message: ' 🍑 🍑 Kasie Transie Backend Server started OK! 🅿️ 🅿️ 🅿️',
        createdAt: new Date().toISOString(),
      },
      notification: {
        title: 'Kasie Transie Backend',
        body: 'Kasie Transie is running good! 🅿️ 🅿️ 🅿️',
      },
    };

    try {
      const response = await admin.messaging().send(message);
      Logger.log(`${mm} 🅿️ 🅿️ 🅿️  Successfully sent FCM message: ${response}`);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  public async sendInitializationMessage(): Promise<any> {
    // The topic name can be optionally prefixed with "/topics/".
    const topic = 'adminTopic';
    Logger.log(`${mm} ... Sending initialization message`);
    const message = {
      notification: {
        title: 'Kasie Transie Backend',
        body: 'Kasie Transie is running good!',
      },
      data: {
        message: 'Kasie Transie Backend Server started!',
        time: `${new Date(new Date().getTime())}`,
      },
    };
    Logger.log(
      `${mm} ... sending Kasie init message ${message} to topic: ${topic} ...`,
    );
    getMessaging().sendToTopic(topic, message);
    return message;
  }
}
