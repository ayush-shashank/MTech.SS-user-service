import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from './filters/GlobalExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const host = config.get<string>('USER_HOST', 'localhost');
  const port = +config.get<number>('USER_PORT', 3001);
  const userService = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: host,
        port: port,
      },
    },
  );
  userService.useGlobalFilters(new GlobalExceptionFilter());
  await userService.listen();
}
bootstrap();
