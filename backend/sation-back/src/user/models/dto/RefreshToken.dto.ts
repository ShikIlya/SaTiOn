import { IsDate, IsInt} from "class-validator";

export class RefreshTokenDto {

    @IsInt()
    usserId: number;

    @IsDate()
    expireDate: Date;

}