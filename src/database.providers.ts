import { Logger } from '@nestjs/common';
import * as mongoose from 'mongoose';
const mm = '🔵 🔵 🔵 🔵 🔵 🔵 Database Provider 🔵 🔵';
const env = process.env.NODE_ENV;
let port: string = '';
let dbUrl: string = '';
if (env === 'production') {
  port = process.env.REMOTE_PORT;
  dbUrl = process.env.REMOTE_DB_URI;
} else {
  port = process.env.LOCAL_PORT;
  dbUrl = process.env.LOCAL_DB_URI;
  Logger.log(`${mm} port: ${port} 🍷🍷 dbUrl: ${dbUrl}`);
}
export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => mongoose.connect(dbUrl),
  },
];
