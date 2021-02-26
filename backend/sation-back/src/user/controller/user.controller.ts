import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
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
            map((jwt: string) => {
                response.cookie('access_token', jwt, {
                    expires: new Date(Date.now() + 1000 * 60 * 5),
                    httpOnly: true,
                    secure: false
                })
                return response.status(HttpStatus.ACCEPTED).send();
            })
        )
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Observable<UserI[]> {
        return this.userService.findAll();
    }




}
