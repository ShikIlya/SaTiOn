import { BeforeInsert, Column, Entity, Generated, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity()
export class RefreshTokenEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({})
    @Generated("uuid")
    token: string;

    @Column('date')
    expireDate: Date;

    // @OneToOne(type => UserEntity)
    // @JoinColumn()
    @Column()
    user: UserEntity;

}