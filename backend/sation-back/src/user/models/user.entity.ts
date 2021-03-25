import { type } from "os";
import { RefreshTokenEntity } from "src/auth/models/refresh-token.entity";
import { RefreshTokenI } from "src/auth/models/refresh-token.interface";
import { BeforeInsert, Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {

    @BeforeInsert()
    doSomeMagic() {
        this.email = this.email.toLocaleLowerCase();
        this.nickname = this.login;
        this.login = this.login.toLocaleLowerCase();
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 50 })
    login: string;

    @Column({ unique: true, length: 100 })
    email: string

    @Column({ select: false })
    password: string

    @Column({ length: 125, nullable: true })
    nickname: string

    @CreateDateColumn({ select: false })
    creationTime: string;

    @OneToMany(type => RefreshTokenEntity, refresh => refresh.userId)
    refresh_tokens: RefreshTokenI[];

}