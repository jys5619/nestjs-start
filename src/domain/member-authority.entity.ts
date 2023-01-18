import { User } from "src/domain/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Member } from "./member.entity";

@Entity('member_authority')
export class MemberAuthority {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int', {name: 'member_id'})
    memberId: number;

    @Column('varchar', {name: 'authority_name'})
    authorityName: string;

    @ManyToOne(type=>Member, member=>member.authorities)
    @JoinColumn({name: 'member_id'})
    member: Member;
}