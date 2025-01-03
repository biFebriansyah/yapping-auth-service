import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'users-service',
        transport: Transport.GRPC,
        options: {
          package: 'users',
          protoPath: join(__dirname, '../proto/users.proto'),
          url: 'localhost:3002',
        },
      },
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
