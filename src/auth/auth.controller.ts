import { Controller, OnModuleInit, Inject, Get, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, tap } from 'rxjs';
import { UserService } from './interface';
import { GetParams } from './auth.dto';

@Controller('auth')
export class AuthController implements OnModuleInit {
  private userService: UserService;

  constructor(@Inject('users-service') private rpcClient: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.rpcClient.getService<UserService>('UserService');
  }

  @Get('/username/:username')
  getByUserName(@Param() params: GetParams): Observable<any> {
    try {
      return this.userService.FindByUsername({ username: params.username });
    } catch (error) {
      throw error;
    }
  }
}
