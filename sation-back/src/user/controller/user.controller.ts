import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SessionI } from 'src/auth/models/session.interface';
import { CreateUserDto } from '../models/dto/CreateUser.dto';
import { LoginUserDto } from '../models/dto/LoginUser.dto';
import { UserI } from '../models/user.interface';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * Зарегестрировать пользователя
   * @param createUserDto данные регистрации (логин, email, пароль)
   * @returns
   */
  @Post('register')
  create(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
    return this.userService.create(createUserDto).pipe(
      switchMap((user: UserI) => {
        return this.login(
          {
            ...LoginUserDto,
            email: createUserDto.email,
            password: createUserDto.password,
          },
          response,
        );
      }),
    );
  }

  /**
   * Авторизовать пользователя
   * @param loginUserDto данные входа (email, пароль)
   * @returns http статус 202 'Accepted'
   */
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto, @Res() response: Response) {
    return this.userService.login(loginUserDto).pipe(
      map((session: SessionI) => {
        response.cookie('access_token', session.access_token, {
          expires: new Date(Date.now() + 1000 * 60 * 5),
          httpOnly: true,
          secure: false,
        });
        response.cookie('refresh_token', session.refresh_token.token, {
          expires: session.refresh_token.expireDate,
          httpOnly: true,
          secure: false,
        });
        return response.status(HttpStatus.ACCEPTED).send();
      }),
    );
  }

  /**
   * Окончить сессию текущего пользователя
   * @returns http статус 200
   */
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logout(@Res() response) {
    response.clearCookie('refresh_token');
    response.clearCookie('access_token');
    return response.status(200).json('User Logged out');
  }

  /**
   * Получить текущего пользователя
   * @returns пользователь в формате UserI
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurUser(@Req() request): Observable<UserI> {
    return request.user;
  }

  /**
   * Проверка авторизации пользователя
   * @returns true/err 'anauthorised'
   */
  @UseGuards(JwtAuthGuard)
  @Get('is_auth')
  check(@Req() request) {
    if (request.user !== null) return true;
  }
}
