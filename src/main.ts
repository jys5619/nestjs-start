import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { setupSwagger } from './util/swagger';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  // const port = process.env.NODE_SERVER_PORT;  // .env 값 가져오기
  const configService = app.get(ConfigService);  // .env ConfigService를 이용하여 값 가져오기
  const port = configService.get<string>('server.port');

  app.use(cookieParser());  // 쿠키를 사용하도록 설정
  setupSwagger(app); // Swgger 설정
  await app.listen(port);
  console.log(`Applicatioon Sever port ${port}`);
}
bootstrap();
