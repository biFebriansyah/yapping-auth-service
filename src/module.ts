import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModules } from './utils/jwt';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), JwtModules.forRoot(), AuthModule],
})
export class AppModule {}
