import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { setupSwagger } from './util/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  // Swgger 설정 시작
  setupSwagger(app);
  // Swgger 설정 끝

  await app.listen(3000);
}
bootstrap();
