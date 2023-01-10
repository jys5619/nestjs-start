import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './util/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swgger 설정 시작
  setupSwagger(app);
  // Swgger 설정 끝

  await app.listen(3000);
}
bootstrap();
