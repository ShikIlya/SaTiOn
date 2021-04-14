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

    create(createUserDto: CreateUserDto): Observable<UserI> {
        return this.mailExists(createUserDto.email.toLowerCase()).pipe(
            switchMap((mailExists: boolean) => {
                if (!mailExists) {
                    return this.loginExists(createUserDto.login.toLowerCase()).pipe(
                        switchMap((loginExists: boolean) => {
                            if (!loginExists) {
                                return this.authService.hashPassword(createUserDto.password).pipe(
                                    switchMap((passHash: string) => {
                                        createUserDto.password = passHash;
                                        return from(this.userRepository.save(
                                            this.userRepository.create(createUserDto)
                                        )).pipe(
                                            map((savedUser: UserI) => {
                                                const { id, password, creationTime, updateTime, ...user } = savedUser;
                                                return user;
                                            })
                                        )
                                    })
                                )
                            } else {
                                throw new HttpException("Login zanyat", HttpStatus.CONFLICT);
                            }
                        }))

                } else {
                    throw new HttpException("Email zanyat", HttpStatus.CONFLICT);
                }
            })
        )
    }

    login(loginUserDto: LoginUserDto): Observable<SessionI> {
        return this.findUserByEmail(loginUserDto.email).pipe(
            switchMap((user: UserI) => {
                if (user) {
                    return this.validatePassword(loginUserDto.password, user.password).pipe(
                        switchMap((match: boolean) => {
                            if (match) {
                                return this.generateSession(user);
                            } else {
                                throw new HttpException('Login failed!', HttpStatus.UNAUTHORIZED);
                            }
                        })
                    )
                } else {
                    throw new HttpException("User not found, Nigga!", HttpStatus.NOT_FOUND);
                }
            })
        )
    }

    generateSession(user: UserI): Observable<SessionI> {
        return this.findOne(user.id).pipe(
            switchMap((user: UserI) => {
                console.log('ya zdes bil')
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

    findOne(id: number): Observable<UserI> {
        return from(this.userRepository.findOne({ id }))
    }

    findAll(): Observable<UserI[]> {
        return from(this.userRepository.find());
    }

    findOneByLogin(login: string): Observable<UserI> {
        return from(this.userRepository.findOne({ login}));
    }

    private findUserByEmail(email: string): Observable<UserI> {
        email = email.toLowerCase();
        return from(this.userRepository.findOne({ email }, { select: ["id", "email", "password"] }));
    }

    private validatePassword(password: string, storedHash: string): Observable<boolean> {
        return this.authService.comparePassword(password, storedHash);
    }

    private mailExists(email: string): Observable<boolean> {
        return from(this.userRepository.findOne({ email })).pipe(
            map((user: UserI) => {
                return user ? true : false;
            })
        )
    }

    private loginExists(login: string): Observable<boolean> {
        return from(this.userRepository.findOne({ login })).pipe(
            map((user: UserI) => {
                return user ? true : false;
            })
        )
    }
}
