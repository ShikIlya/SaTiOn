import { BeforeInsert, Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserEntity {

    @BeforeInsert()
    doSomeShit() {
        this.email = this.email.toLocaleLowerCase();
        this.login = this.login.toLocaleLowerCase();
        this.nickname = this.login;
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


}