import { Controller, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, GrpcMethod, Client, RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { Observable, firstValueFrom } from 'rxjs';
import { UserService } from '../users/users.interface';
import { UserGrpcClient } from '../users/users.grpc.client';
import { CreateUserDto } from '../users/users.dto';
import { SignInAuthDto, TokenAuthDto } from './auth.dto';
import { status } from '@grpc/grpc-js';
import { Validate } from '../utils/bcrypt';

@Controller('auth')
export class AuthController implements OnModuleInit {
  constructor(private readonly jwt: JwtService) {}

  @Client(UserGrpcClient)
  private readonly userGrpcClient: ClientGrpc;

  private userService: UserService;

  onModuleInit() {
    this.userService = this.userGrpcClient.getService<UserService>('UserService');
  }

  @GrpcMethod('AuthService', 'SignUp')
  SignUp(body: CreateUserDto): Observable<any> {
    try {
      return this.userService.CreateData(body);
    } catch (error) {
      throw new RpcException({
        code: status.INTERNAL,
        message: error.message || 'An unexpected error occurred',
      });
    }
  }

  @GrpcMethod('AuthService', 'SignIn')
  async SignIn(body: SignInAuthDto): Promise<TokenAuthDto> {
    try {
      const userObserv = this.userService.FatchCert({ username: body.username });
      const userData = await firstValueFrom(userObserv).catch(() => {});
      if (!userData || !userData?.password) {
        throw new RpcException({
          code: status.NOT_FOUND,
          message: 'Username Not Found',
        });
      }

      const isPasswordValid = await Validate(body.password, userData.password);
      if (!isPasswordValid) {
        throw new RpcException({
          code: status.UNAUTHENTICATED,
          message: 'Wrong Password',
        });
      }

      const token = await this.jwt.signAsync({ userId: userData._id, username: body.username });
      return { token };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new RpcException({
        code: status.INTERNAL,
        message: error.message || 'An unexpected error occurred',
      });
    }
  }
}
