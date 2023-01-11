import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { MemberDTO } from "./dto/member.dto";
import { Member } from "./entity/member.entity";
// import { MemberRepository } from "./entity/member.repository";

@Injectable()
export class MemberService {

    constructor(@InjectRepository(Member) private memberRepository: Repository<Member>) {}

    async findByFields(options: FindOneOptions<MemberDTO>): Promise<MemberDTO | undefined> {
        return await this.memberRepository.findOne(options);
    }

    async save(memberDTO: MemberDTO): Promise<MemberDTO | undefined> {
        return await this.memberRepository.save<MemberDTO>(memberDTO);
    }
}