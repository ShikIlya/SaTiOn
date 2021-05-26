import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WsException } from '@nestjs/websockets';
import { forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserI } from 'src/user/models/user.interface';
import { UserService } from 'src/user/service/user.service';
import { SessionI } from '../models/session.interface';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class WsAuthGuard extends AuthGuard('jwt') {
  constructor() // private authService: AuthService, // private userService: UserService,
  {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  // activate(context: ExecutionContext) {
  //   return super.canActivate(context);
  // }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new WsException('Unauthorised');
    }
    return user;
  }
}
