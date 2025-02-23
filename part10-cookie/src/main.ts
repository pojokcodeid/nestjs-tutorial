import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // const cookieParserFn = cookieParser as () => void;
  // app.use(cookieParserFn());
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
void bootstrap();
