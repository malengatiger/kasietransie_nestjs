/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initializeApp } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import * as admin from 'firebase-admin';
import { GoogleAuth } from 'google-auth-library';
import axios from 'axios';

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
      Logger.log(
        `${mm} 🅿️ 🅿️ 🅿️  Successfully sent FCM message: \n🚺 🚺 🚺 ${JSON.stringify(
          message,
        )} \n🚺 🚺 🚺 FCM response: ${response}`,
      );
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  async getMessagesFromFCMTopic(topic: string): Promise<any[]> {
    const serverKey = process.env.FIREBASE_SERVER_KEY; // Replace with your FCM server key
    const messages: any[] = [];
    Logger.log(
      `${mm} .... getMessagesFromFCMTopic geting messages from ${topic}`,
    );
    try {
      const response = await axios.post(
        `https://fcm.googleapis.com/v1/projects/${process.env.GOOGLE_CLOUD_PROJECT}/messages:list`,
        {
          topic: `projects/${process.env.GOOGLE_CLOUD_PROJECT}/topics/${topic}`,
        },
        {
          headers: {
            Authorization: `Bearer ${serverKey}`,
          },
        },
      );

      const messages = response.data.messages;
      console.log(`${mm} Messages from adminTopic:`, messages);
      // Process the messages as per your requirements
    } catch (error) {
      console.error('${mm} Error retrieving messages:', error);
    }
    Logger.log(
      `${mm} .... getMessagesFromFCMTopic found ${messages} messages from ${topic}`,
    );
    return messages;
  }
}
