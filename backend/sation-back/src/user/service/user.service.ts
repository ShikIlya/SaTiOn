import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { generateString, InjectRepository } from '@nestjs/typeorm';
import { map, mergeMap, switchMap } from 'rxjs/operators'
import { from, Observable } from 'rxjs';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { UserI } from '../models/user.interface';
import { LoginUserDto } from '../models/dto/LoginUser.dto';
import { CreateUserDto } from '../models/dto/CreateUser.dto';
import { RefreshTokenI } from 'src/auth/models/refresh-token.interface';
import { SessionI } from 'src/auth/models/session.interface';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserI>,
    private authService: AuthService
  ) { }

  /**
   * Создать нового пользователя
   * @param createUserDto данные регистрации
   * @returns новый пользователь в формате UserI / ошибка
   */
  create(createUserDto: CreateUserDto): Observable<UserI> {
    return this.mailExists(createUserDto.email.toLowerCase()).pipe(
      switchMap((mailExists: boolean) => {
        if (!mailExists) {
          return this.loginExists(createUserDto.login.toLowerCase()).pipe(
            switchMap((loginExists: boolean) => {
              if (!loginExists) {
                return this.authService.hashPassword(createUserDto.password).pipe(
                  switchMap((passHash: string) => {
                    return from(this.userRepository.save(
                      this.userRepository.create({ ...createUserDto, password: passHash })
                    )).pipe(
                      map((savedUser: UserI) => {
                        const { id, password, creationTime, updateTime, ...user } = savedUser;
                        return user;
                      })
                    )
                  })
                )
              } else {
                throw new HttpException("Это имя уже занято", HttpStatus.CONFLICT);
              }
            }))

        } else {
          throw new HttpException("Эта почта уже занята", HttpStatus.CONFLICT);
        }
      })
    )
  }

  /**
   * Авторизовать пользователя
   * @param loginUserDto данные авторизации
   * @returns данные сессии SessionI / ошибка
   */
  login(loginUserDto: LoginUserDto): Observable<SessionI> {
    return this.findUserByEmail(loginUserDto.email).pipe(
      switchMap((user: UserI) => {
        if (user !== null) {
          return this.validatePassword(loginUserDto.password, user.password).pipe(
            switchMap((match: boolean) => {
              if (match) {
                return this.generateSession(user);
              } else {
                throw new HttpException('Авторизация прервана', HttpStatus.UNAUTHORIZED);
              }
            })
          )
        } else {
          throw new HttpException("Такого пользователя не существует", HttpStatus.NOT_FOUND);
        }
      })
    )
  }

  /**
   * Сгенерировать данные сессии
   * @param user пользователь в формате UserI
   * @returns данные сессии SessionI
   */
  generateSession(user: UserI): Observable<SessionI> {
    return this.findOne(user.id).pipe(
      switchMap((user: UserI) => {
        return this.authService.generateJwt(user, '300s').pipe(
          switchMap((jwt: string) => {
            return this.authService.makeRefreshToken(user.id).pipe(
              map((refresh: RefreshTokenI) => {
                return <SessionI>{
                  access_token: jwt,
                  refresh_token: refresh
                }
              })
            )
          })
        )
      })
    )
  }

  /**
   * Получить пользователя по id
   * @param id id пользователя
   * @returns пользователь в формате UserI
   */
  findOne(id: number): Observable<UserI> {
    return from(this.userRepository.findOne({ id }))
  }

  /**
   * Получить пользователя по имени
   * @param login имя пользователя
   * @returns пользователь в формате UserI / err
   */
  checkLogin(login: string): Observable<UserI> {
    return from(this.userRepository.findOne({ login }))
      .pipe(
        map((user: UserI) => {
          if (user !== null) {
            return user;
          }
          else
            throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
        })
      )
  }

  /**
   * Найти пользователя по почте
   * @param email эл. почта в виде строки
   * @returns пользователь в формате UserI
   */
  private findUserByEmail(email: string): Observable<UserI> {
    return from(this.userRepository.findOne({ email: email.toLowerCase() }, { select: ["id", "email", "password"] }));
  }

  /**
   * Сверить пароль
   * @param password входящий пароль
   * @param storedHash хранимый пароль
   * @returns true/false
   */
  private validatePassword(password: string, storedHash: string): Observable<boolean> {
    return this.authService.comparePassword(password, storedHash);
  }

  /**
   * Проверить занятость почты
   * @param email эл. почта в виде строки
   * @returns trues/false
   */
  private mailExists(email: string): Observable<boolean> {
    return from(this.userRepository.findOne({ email })).pipe(
      map((user: UserI) => {
        return user !== null ? true : false;
      })
    )
  }

  /**
   * Проверить занятость имени пользователя
   * @param login имя пользователя
   * @returns true/false
   */
  private loginExists(login: string): Observable<boolean> {
    return from(this.userRepository.findOne({ login })).pipe(
      map((user: UserI) => {
        return user !== null ? true : false;
      })
    )
  }
}
