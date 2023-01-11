import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MemberAuthority } from "./member-authority.entity";

@Entity()
export class Member {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(type=>MemberAuthority, memberAuthority => memberAuthority.member, {eager: true})
    authorities?: any[];
}