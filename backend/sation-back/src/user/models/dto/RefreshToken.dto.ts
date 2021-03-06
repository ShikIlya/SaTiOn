import { IsDate, IsInt } from "class-validator";

export class RefreshTokenDto {

    usserId: number;

    expireDate: Date;
}