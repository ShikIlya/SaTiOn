import { ExecutionContext, forwardRef, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { forkJoin } from "rxjs";
import { from, Observable } from "rxjs";
import { concatAll, map, switchMap } from "rxjs/operators";
import { SessionI } from "src/auth/models/session.interface";
import { UserI } from "src/user/models/user.interface";
import { UserService } from "src/user/service/user.service";
import { RefreshTokenI } from "../models/refresh-token.interface";
import { AuthService } from "../services/auth/auth.service";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
        @Inject(forwardRef(() => AuthService))
        private authService: AuthService
    ) {
        super()
    }


    canActivate(context: ExecutionContext): boolean | Observable<boolean> | Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const access_token = request.cookies['access_token'];
        const refresh_token = request.cookies['refresh_token'];


        // console.log(request);
        // console.log(response);


        if (access_token)
            return super.canActivate(context);
        else
            return this.authService.getUserByToken(refresh_token).pipe(
                map((user: UserI) => {
                    if (user) {
                        forkJoin([this.authService.deleteRefreshToken(refresh_token, user.id), this.userService.generateSession(user)]).pipe(
                            map(([a, session]) => {
                                response.cookie('access_token', session.access_token, {
                                    expires: new Date(Date.now() + 1000 * 60 * 5),
                                    httpOnly: true,
                                    secure: false,
                                })
                                response.cookie('refresh_token', session.refresh_token.token, {
                                    expires: session.refresh_token.expireDate,
                                    httpOnly: true,
                                    secure: false,
                                })
                            })
                        )
                    }
                    return super.canActivate(context);
                })
            )
    }

    handleRequest(err, user) {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}