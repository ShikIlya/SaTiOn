import { Column, Entity, Generated, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../user/models/user.entity";

@Entity()
export class RefreshTokenEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('uuid', { unique: true })
    token: string;

    @Column('timestamp with time zone')
    expireDate: Date;

    @OneToOne(() => UserEntity)
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    userId: number;

}