import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { generateString, InjectRepository } from '@nestjs/typeorm';
import { map, switchMap } from 'rxjs/operators'
import { from, Observable } from 'rxjs';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { UserI } from '../models/user.interface';
import { LoginUserDto } from '../models/dto/LoginUser.dto';
import { CreateUserDto } from '../models/dto/CreateUser.dto';
import { RefreshTokenI } from '../models/refresh-token.interface';
import { RefreshTokenDto } from '../models/dto/RefreshToken.dto';
import { RefreshTokenEntity } from '../models/refresh-token.entity';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserI>,
        @InjectRepository(RefreshTokenEntity)
        private refreshRepository: Repository<RefreshTokenI>,
        private authService: AuthService
    ) { }

    create(createUserDto: CreateUserDto): Observable<UserI> {
        return this.mailExists(createUserDto.email).pipe(
            switchMap((exists: boolean) => {
                if (!exists) {
                    return this.authService.hashPassword(createUserDto.password).pipe(
                        switchMap((passHash: string) => {
                            createUserDto.password = passHash;
                            return from(this.userRepository.save(
                                this.userRepository.create(createUserDto)
                            )).pipe(
                                map((savedUser: UserI) => {
                                    const { password, creationTime, updateTime, ...user } = savedUser;
                                    return user;
                                })
                            )
                        })
                    )
                } else {
                    throw new HttpException("Email zanyat", HttpStatus.CONFLICT);
                }
            })
        )
    }

    login(loginUserDto: LoginUserDto): Observable<string> {
        return this.findUserByEmail(loginUserDto.email).pipe(
            switchMap((user: UserI) => {
                if (user) {
                    return this.validatePassword(loginUserDto.password, user.password).pipe(
                        switchMap((match: boolean) => {
                            if (match) {
                                return this.findOne(user.id).pipe(
                                    switchMap((user: UserI) => this.authService.generateJwt(user, '300s'))
                                )
                            } else {
                                throw new HttpException('Login sucked dick', HttpStatus.UNAUTHORIZED);
                            }
                        })
                    )
                } else {
                    throw new HttpException("Usssr not found", HttpStatus.NOT_FOUND);
                }
            })
        )
    }

    makeRefreshToken(refreshTokenDto: RefreshTokenDto): Observable<RefreshTokenI> {
        return from(this.refreshRepository.save(
            this.refreshRepository.create(refreshTokenDto)
        )).pipe(
            map((refresh: RefreshTokenI) => {
                return refresh;
            })
        )
    }

    updateRefreshToken(token: string): Observable<UpdateResult> {
        return from(this.refreshRepository.findOne({ token })).pipe(
            switchMap((refreshToken: RefreshTokenI) => {
                const newRefreshToken = { ...refreshToken }
                let today = new Date();
                today.setMonth(today.getMonth() + 2)
                newRefreshToken.expireDate = today;
                newRefreshToken.token = uuidv4();
                return this.refreshRepository.update(refreshToken.id, newRefreshToken)
            })
        )
    }

    deleteRefreshToken(token: string) {
        return from(this.refreshRepository.findOne({ token })).pipe(
            switchMap((refreshToken: RefreshTokenI) => {
                return this.refreshRepository.delete(refreshToken);
            })
        )
    }

    findOne(id: number): Observable<UserI> {
        return from(this.userRepository.findOne({ id }))
    }

    findAll(): Observable<UserI[]> {
        return from(this.userRepository.find());
    }

    private findUserByEmail(email: string): Observable<UserI> {
        return from(this.userRepository.findOne({ email }, { select: ["id", "email", "email", "password"] }));
    }

    private validatePassword(password: string, storedHash: string): Observable<boolean> {
        return this.authService.comparePassword(password, storedHash);
    }

    private mailExists(email: string): Observable<boolean> {
        return from(this.userRepository.findOne({ email })).pipe(
            map((user: UserI) => {
                if (user) {
                    return true;
                }
                else
                    return false;
            })
        )
    }
}
