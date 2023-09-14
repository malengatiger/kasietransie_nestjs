import { Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

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
}
