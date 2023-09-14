import { ConfigProps } from './config.interface';
import { MyUtils } from 'src/my-utils/my-utils';
export const config = (): ConfigProps => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  api: {
    apiUrl: process.env.API_URL,
    httpTimeout: 1000,
  },
  mongodb: {
    database: {
      connectionString: MyUtils.getDatabaseUrl(),
      databaseName: 'kasie_transie_db',
    },
  },
});
