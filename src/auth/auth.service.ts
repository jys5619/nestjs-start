import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { MemberDTO } from './dto/member.dto';
import { MemberService } from './member.service';

@Injectable()
export class AuthService {

    constructor(private memberService: MemberService) {}

    async registerMember(newMember: MemberDTO): Promise<MemberDTO> {
        let memberFind: MemberDTO = await this.memberService.findByFields({
            where: {username: newMember.username}
        });
        if ( memberFind ) {
            throw new HttpException('Username aleady used!', HttpStatus.BAD_REQUEST);
        }
        return await this.memberService.save(newMember);
    }

    async validateMember(memberDTO: MemberDTO): Promise<MemberDTO | undefined> {
        let memberFind: MemberDTO = await this.memberService.findByFields({
            where: { username: memberDTO.username}
        });

        console.log("memberDTO ", memberDTO);
        console.log("memberFind ", memberFind);
        if ( !memberFind || memberDTO.password !== memberFind.password ) {
            throw new UnauthorizedException();
        }

        return memberFind;
    }
}
