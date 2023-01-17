import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { MemberDTO } from './dto/member.dto';
import { MemberService } from './member.service';
import * as bcrypt from 'bcrypt';
import { Payload } from './security/payload.interface';
import { Member } from './entity/member.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private memberService: MemberService,
        private jwtService: JwtService,
    ) {}

    async registerMember(newMember: MemberDTO): Promise<MemberDTO> {
        let memberFind: MemberDTO = await this.memberService.findByFields({
            where: {username: newMember.username}
        });
        if ( memberFind ) {
            throw new HttpException('Username aleady used!', HttpStatus.BAD_REQUEST);
        }
        console.log(333);
        return await this.memberService.save(newMember);
    }

    /**
     * 로그인 ID, PW를 이용하여 사용자 정보를 조회한다.
     * @param memberDTO 
     * @returns 
     */
    async validateMember(memberDTO: MemberDTO): Promise<{accessToken: string} | undefined> {
        // Member username으로 Member 정보를 조회한다.
        let memberFind: Member = await this.memberService.findByFields({
            where: { username: memberDTO.username}
        });

        // 암호화한 패스워드를 비교한다.
        const validatePassword = await bcrypt.compare(memberDTO.password, memberFind.password);

        if ( !memberFind || !validatePassword ) {
            throw new UnauthorizedException();
        }

        // Payload에 넣어줄 값을 설정한다.
        const payload: Payload = {
            id: memberFind.id, 
            username: memberFind.username, 
            authorities: memberFind.authorities?.map(authority => {return {name: authority.authorityName}})
        };

        return {
            accessToken: this.jwtService.sign(payload)
        };
    }

    /**
     * JWT TOKEN의 Payload값으로 Member 정보를 조회하여 반환한다.
     * @param payload 
     * @returns 
     */
    async tokenValidateMember(payload: Payload): Promise<Member | undefined> {
        const memberFind = await this.memberService.findByFields({
            where: {id: payload.id}
        });

        memberFind.authorities = memberFind.authorities?.map(authority => authority.authorityName);
        return memberFind;
    }
}
