import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions } from "typeorm";
import { MemberDTO } from "./dto/member.dto";
import { MemberRepository } from "./entity/member.repository";

@Injectable()
export class MemberService {
    constructor(@InjectRepository(MemberRepository) private memberRepository: MemberRepository) {}

    async findByFields(options: FindOneOptions<MemberDTO>): Promise<MemberDTO | undefined> {
        return await this.memberRepository.findOne(options);
    }

    async save(memberDTO: MemberDTO): Promise<MemberDTO | undefined> {
        return await this.memberRepository.save(memberDTO);
    }
}