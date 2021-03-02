import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map, switchMap } from 'rxjs/operators'
import { from, Observable } from 'rxjs';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { UserI } from '../models/user.interface';
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
                            const instance = this.userRepository.create(createUserDto);
                            return from(this.userRepository.save(instance)).pipe(
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
