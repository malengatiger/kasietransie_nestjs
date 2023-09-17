/* eslint-disable @typescript-eslint/no-unused-vars */
import { Logger } from '@nestjs/common';
import * as qrcode from 'qrcode';
import admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';
const mm = '🥦 🥦 🥦 🥦 MyUtils 🥦🥦';

export abstract class MyUtils {
  public static getDatabaseUrl(): string {
    const env = process.env.NODE_ENV;
    let dbUrl: string = '';
    if (env === 'production') {
      dbUrl = process.env.REMOTE_DB_URI;
    } else {
      dbUrl = process.env.LOCAL_DB_URI;
    }
    Logger.log(`${mm} 🍷🍷 dbUrl: ${dbUrl}`);
    return dbUrl;
  }
  public static getPort(): string {
    let port: string = '';
    const env = process.env.NODE_ENV;

    if (env === 'production') {
      port = process.env.REMOTE_PORT;
    } else {
      port = process.env.LOCAL_PORT;
    }
    Logger.log(`${mm} port: ${port} 🍷🍷 `);

    return port;
  }
  public static async createQRCodeAndUploadToCloudStorage(
    input: string,
    prefix: string,
    size: number,
  ): Promise<string> {
    Logger.log(`${mm} qrcode prefix: ${prefix} - size: ${size}`);
    try {
      const fileName = `qrcode_${prefix}_${new Date().getTime()}.png`;
      const tempDir = path.join(__dirname, '..', 'tempFiles');
      const tempFilePath = path.join(tempDir, fileName);

      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }
      let version = 10;
      if (size == 1) {
        version = 20;
      }
      if (size == 2) {
        version = 30;
      }
      if (size == 3) {
        version = 40;
      }
      Logger.log(`${mm} qrcode version: ${version}`);
      await qrcode.toFile(tempFilePath, input, {
        version: version,
      });
      Logger.log(`${mm} tempFilePath.length: ${tempFilePath.length} bytes`);
      // Upload QR code image to Google Cloud Storage
      const storage = admin.storage();
      Logger.log(`${mm} uploading qrcode file: ${tempFilePath}`);

      const options = {
        destination: `kasieMedia/${fileName}`,
        metadata: {
          contentType: 'image/png',
          predefinedAcl: 'publicRead',
        },
      };
      const [file] = await storage.bucket().upload(tempFilePath, options);
      const [metadata] = await file.getMetadata();
      Logger.log(`${mm} returning medialink: 🔵 🔵 🔵 ${metadata.mediaLink}`);
      return metadata.mediaLink;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create QR code and upload to Cloud Storage.');
    }
  }
}
/*
{
        "_id": "6498aa22171e9639e239df39",
        "ownerId": "rtGy0aOveOMB7BUxemPo2go9H0p2",
        "vehicleId": "b4d3eb97-c74a-4528-9527-e7a847bcdb34",
        "associationId": "2f3faebd-6159-4b03-9857-9dad6d9a82ac",
        "ownerName": "Donnie G Fredericks",
        "associationName": "The Most Awesome Taxi Association",
        "vehicleReg": "BFF 33 GP",
        "model": "Quantum",
        "make": "Toyota",
        "year": "2018",
        "passengerCapacity": 16,
        "active": 0,
        "created": "2023-06-25T22:51:04.341+02:00",
        "_class": "com.boha.kasietransie.data.dto.Vehicle"
    }
    */
