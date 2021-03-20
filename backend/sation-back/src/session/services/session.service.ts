import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { RefreshTokenEntity } from '../models/refresh-token.entity';
import { RefreshTokenI } from '../models/refresh-token.interface';
import { RefreshTokenDto } from '../models/dto/RefreshToken.dto';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SessionService {

    constructor(
        @InjectRepository(RefreshTokenEntity)
        private refreshRepository: Repository<RefreshTokenI>
    ) { }


    makeRefreshToken(userId: number): Observable<RefreshTokenI> {
        return from(this.refreshRepository.save(
            this.refreshRepository.create(this.generateRefreshTokenDto(userId)))
        )
    }

    // updateRefreshToken(token: string): Observable<boolean> {
    //     return from(this.refreshRepository.update(token, this.generateRefreshTokenDto())).pipe(
    //         map((result: UpdateResult) => {
    //             if (result.affected)
    //                 return true;
    //             else
    //                 return false
    //         })
    //     )
    // }

    deleteRefreshToken(token: string): Observable<boolean> {
        return from(this.refreshRepository.delete(token)).pipe(
            map((result: DeleteResult) => {
                if (result.affected)
                    return true;
                else
                    return false;
            })
        )
    }

    getUserIdByToken(token: string): Observable<number> {
        return from(this.refreshRepository.findOne({ token })).pipe(
            map((token: RefreshTokenI) => {
                return token.userId;
            })
        );
    }

    private generateRefreshTokenDto(userId?: number): RefreshTokenDto {
        let date = new Date();
        date.setDate(date.getDate() + 15);
        const refreshTokenDto: RefreshTokenDto = {
            token: uuidv4(),
            expireDate: date
        }
        if (userId) {
            refreshTokenDto.userId = userId;
        }
        return refreshTokenDto;
    }

}
