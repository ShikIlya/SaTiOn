import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { map, switchMap } from "rxjs/operators";
import { SessionI } from "src/auth/models/session.interface";
import { UserI } from "src/user/models/user.interface";
import { UserService } from "src/user/service/user.service";
import { RefreshTokenI } from "../models/refresh-token.interface";
import { AuthService } from "../services/auth/auth.service";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(
        private userService: UserService,
        private authService: AuthService
    ) {
        super()
    }


    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const access_token = request.cookies['access_token'];
        const refresh_token = request.cookies['refresh_token'];
        
        if (access_token) {
            return super.canActivate(context);
        }

        // console.log(request);
        // console.log(response);

        if (refresh_token) {
            this.authService.getUserIdByToken(refresh_token).pipe(
                switchMap((token: RefreshTokenI) => {
                    console.log('suda1');
                    return this.authService.deleteRefreshToken(refresh_token).pipe(
                        switchMap((result: boolean) => {
                            console.log('suda2');
                            if (result) {
                                return this.userService.findOne(token.userId).pipe(
                                    switchMap((user: UserI) => {
                                        console.log('suda3');
                                        return this.userService.generateSession(user).pipe(
                                            map((session: SessionI) => {
                                                console.log('suda4');
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

                                                // request.cookies['access_token'] = response.cookies['access_token'];
                                            })
                                        )
                                    })
                                )
                            }
                        })
                    )

                })
            )
        }

        // console.log(request);
        //console.log(response);

        return super.canActivate(context);




    }

    handleRequest(err, user) {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}