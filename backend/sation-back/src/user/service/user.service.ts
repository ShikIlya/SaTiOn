import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map, switchMap } from 'rxjs/operators'
import { from, Observable } from 'rxjs';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { UserI } from '../models/user.interface';
import e from 'express';
import { LoginUserDto } from '../models/dto/LoginUser.dto';
import { CreateUserDto } from '../models/dto/CreateUser.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserI>,
        private authService: AuthService
    ) { }

    create(createUserDto: CreateUserDto): Observable<UserI> {
        return this.mailExists(createUserDto.email).pipe(
            switchMap((exists: boolean) => {
                if (!exists) {
                    return this.authService.hashPassword(createUserDto.password).pipe(
                        switchMap((passHash: string) => {
                            createUserDto.password = passHash;
                            return from(this.userRepository.save(createUserDto)).pipe(
                                map((savedUser: UserI) => {
                                    const { password, ...user } = savedUser;
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
                        map((match: boolean) => {
                            if (match) {
                                return "Login Sucksess";
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
