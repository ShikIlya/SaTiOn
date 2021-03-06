import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../services/auth/auth.service';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(payload: any) {
        const refresh = function (req) {
            var token = null;
            if (req && req.cookies) {
                token = req.cookies['refresh_tokken'];
            }
            throw new UnauthorizedException();
        }
        return 
        //const authJwt = this.authService.generateJwt() 
    }
}