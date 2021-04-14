import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../user/models/user.entity";

@Entity()
export class RefreshTokenEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('uuid')
    token: string;

    @Column('timestamp with time zone')
    expireDate: Date;

    @ManyToOne(type => UserEntity, user => user.refresh_tokens, {nullable: false})
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    userId: number;

}