import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RefreshTokenDto } from 'src/auth/models/dto/RefreshToken.dto';
import { RefreshTokenEntity } from 'src/auth/models/refresh-token.entity';
import { RefreshTokenI } from 'src/auth/models/refresh-token.interface';
import { UserEntity } from 'src/user/models/user.entity';
import { UserI } from 'src/user/models/user.interface';
import { DeleteResult, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(RefreshTokenEntity)
    private refreshRepository: Repository<RefreshTokenI>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserI>
  ) { }

  /**
   * Создать Refresh Token
   * @param userId id пользователя
   * @returns RefreshTokenI
   */
  makeRefreshToken(userId: number): Observable<RefreshTokenI> {
    return from(this.refreshRepository.save(
      this.refreshRepository.create(this.generateRefreshTokenDto(userId)))
    )
  }

  /**
   * Удалить Refresh Token из бд
   * @param token значение токена
   * @param userId id пользователя
   * @returns true/false
   */
  deleteRefreshToken(token: string, userId: number): Observable<boolean> {
    return from(this.refreshRepository.delete({ token, userId })).pipe(
      map((result: DeleteResult) => {
        if (result.affected !== undefined)
          return true;
        else
          return false;
      })
    )
  }

  /**
   * Получить пользователя по токену
   * @param refresh значение токена
   * @returns пользователя в формате UserI
   */
  getUserByToken(refresh: string): Observable<UserI> {
    return from(this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.refresh_tokens', 'refresh')
      .where('refresh.token = :token', { token: refresh })
      .getOne()).pipe(
        map((user: UserI) => {
          if (user !== null)
            return user;
        })
      )
  }

  /**
   * Сгенерировать вводные данные для Refresh Token
   * @param userId необязательный id пользователя
   * @returns RefreshTokenDto
   */
  generateRefreshTokenDto(userId?: number): RefreshTokenDto {
    let date = new Date();
    date.setDate(date.getDate() + 15);
    const refreshTokenDto: RefreshTokenDto = {
      token: uuidv4(),
      expireDate: date
    }
    if (userId !== null) {
      refreshTokenDto.userId = userId;
    }
    return refreshTokenDto;
  }

  /**
   * Сгенерировать JWT
   * @param data данные в строковом или JSON виде
   * @param expireTime значение времени в виде строки
   * @returns строку с JWT
   */
  generateJwt(data: any, expireTime: string): Observable<string> {
    return from(this.jwtService.signAsync({ data }, { expiresIn: expireTime }));
  }

  /**
   * Захэшировать пароль
   * @param password пароль в виде строки
   * @returns хэш пароля
   */
  hashPassword(password: string): Observable<string> {
    return from<string>(bcrypt.hash(password, 13));
  }

  /**
   * Сравнить хэш паролей
   * @param password приходящий пароль
   * @param storedPassHash хранимый пароль
   * @returns true/false
   */
  comparePassword(password: string, storedPassHash: string): Observable<any> {
    return from(bcrypt.compare(password, storedPassHash));
  }

}
