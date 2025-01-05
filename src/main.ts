import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'auth',
      protoPath: join(__dirname, './_proto/auth.proto'),
      url: process.env.GRPC_URL || 'localhost:3001',
    },
  });

  await app.listen();
}

bootstrap();
