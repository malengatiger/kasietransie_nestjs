/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const mm = 'FirebaseService';

@Injectable()
export class FirebaseService {
  constructor(private configService: ConfigService) {}

  public async initializeFirebase(): Promise<void> {
    return null;
  }
}
