import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('host:', process.env.host);
  console.log('Database:', process.env.database);
  await app.listen(3000);
}
bootstrap();
