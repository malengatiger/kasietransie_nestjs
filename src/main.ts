import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config'; //
//
console.log(`🔵 🔵 AppModule: Kasie backend port : ${process.env.PORT}`);
const dbUrl = process.env.DB_URI || 'checkUrl';
const port = process.env.PORT || 9950;
console.log(`🌼 🌼 🌼 AppModule: mongodb database 🌼 url: ${dbUrl}`);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true, 
  });
  app.enableCors();
  await app.listen(port);
  //
  console.log(`main.ts: 🍎 🍎 🍎 bootstrap: Listening on Port ${port} ....`);
  console.log(
    `🔵 🔵 🔵 🔵 🔵 bootstrap: AppModule started with url: ${await app.getUrl()} ....`,
  );
}
bootstrap();
