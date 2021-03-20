import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable } from 'rxjs';
import { UserI } from 'src/user/models/user.interface';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService) { }

    generateJwt(user: UserI, expireTime: string): Observable<string> {
        return from(this.jwtService.signAsync({ user }, { expiresIn: expireTime }));
    }

    generateRefresh(token: string, expireTime: string): Observable<string> {
        return from(this.jwtService.signAsync({ token }, { expiresIn: expireTime }))
    }

    hashPassword(password: string): Observable<string> {
        return from<string>(bcrypt.hash(password, 13));
    }

    comparePassword(password: string, storedPassHash: string): Observable<any> {
        return from(bcrypt.compare(password, storedPassHash));
    }

}
