import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  await app.listen(process.env.PORT || 5000).then(() => {
    console.log(`API running in: ${process.env.PORT}`);
  });
}
bootstrap();
