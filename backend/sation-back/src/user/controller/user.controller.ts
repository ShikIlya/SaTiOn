import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express'
import { access } from 'fs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RefreshTokenI } from 'src/session/models/refresh-token.interface';
import { SessionI } from 'src/session/models/session.interface';
import { SessionService } from 'src/session/services/session.service';
import { CreateUserDto } from '../models/dto/CreateUser.dto';
import { LoginUserDto } from '../models/dto/LoginUser.dto';
import { UserI } from '../models/user.interface';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) { }

    @Post('create')
    create(@Body() createUserDto: CreateUserDto): Observable<UserI> {
        return this.userService.create(createUserDto);
    }

    @Post('login')
    login(@Body() loginUserDto: LoginUserDto, @Res() response: Response) {
        return this.userService.login(loginUserDto).pipe(
            map((access_token: string) => {
                response.cookie('access_token', access_token, {
                    expires: new Date(Date.now() + 1000 * 60 * 5),
                    httpOnly: true,
                    secure: false,
                })
                console.log(loginUserDto);
                // return this.userService.makeRefreshTokenByEmail(loginUserDto.email).pipe(
                //     map((refresh_token: RefreshTokenI) => {
                //         console.log(refresh_token);
                //         response.cookie('refresh_token', refresh_token.token, {
                //             expires: refresh_token.expireDate,
                //             httpOnly: true,
                //             secure: false,
                //         })
                //     })
                // )

                return response.status(HttpStatus.ACCEPTED).send();

            })
        )
    }


    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Req() request): Observable<UserI> {
        return this.userService.findOne(request.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('is_auth')
    check(@Req() request) {
        if (request.user)
            return true;
    }

}

