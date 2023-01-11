import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { MemberDTO } from "./dto/member.dto";
import { Member } from "./entity/member.entity";
import * as bcrypt from 'bcrypt';
import { MemberRepository } from "./repository/member.repository";

@Injectable()
export class MemberService {

    constructor(@InjectRepository(MemberRepository) private memberRepository: MemberRepository) {}

    async findByFields(options: FindOneOptions<Member>): Promise<Member | undefined> {
        return await this.memberRepository.findOne(options);
    }

    async save(memberDTO: MemberDTO): Promise<MemberDTO | undefined> {
        console.log("memberDTO ", memberDTO);
        await this.transformPassword(memberDTO);
        console.log("memberDTO ", memberDTO);
        return await this.memberRepository.save<MemberDTO>(memberDTO);
    }

    async transformPassword(memberDTO: MemberDTO): Promise<void> {
        // password solt 10
        memberDTO.password = await bcrypt.hash(memberDTO.password, 10);

        return Promise.resolve();
    }
}