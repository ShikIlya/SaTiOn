import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { forkJoin, Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { UserI } from "src/user/models/user.interface";
import { UserService } from "src/user/service/user.service";
import { SessionI } from "../models/session.interface";
import { AuthService } from "../services/auth/auth.service";




@Injectable()
export class SessionGuard implements CanActivate {
    constructor(
        private userService: UserService,
        private authService: AuthService
    ) { }

    canActivate(context: ExecutionContext): Observable<boolean> | boolean {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const access_token = request.cookies['access_token'];
        const refresh_token = request.cookies['refresh_token'];
        if (access_token)
            return true;
        else if (refresh_token)
            return this.authService.getUserByToken(refresh_token).pipe(
                switchMap((user: UserI) => {
                    return this.userService.generateSession(user).pipe(
                        map((session: SessionI) => {
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
                            console.log('ass1');
                            response.user = user;
                            return true;
                        })
                    )
                }
                )
            )
        else return false;
    }

    handleRequest(err, user) {
        if (err) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}