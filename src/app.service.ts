import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return (
      'Heita Daar! 🍎 🍎 🍎 🍎 Hello World! from AppService: ' +
      new Date().getTime()
    );
  }
}
