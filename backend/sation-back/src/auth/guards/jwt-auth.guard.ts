import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "src/user/service/user.service";
import { AuthService } from "../services/auth/auth.service";


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor() { super() }


    canActivate(context: ExecutionContext) {
        return super.canActivate(context);

    }

    handleRequest(err, user) {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}