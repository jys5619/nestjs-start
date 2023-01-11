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

    async validateMember(memberDTO: MemberDTO): Promise<{accessToken: string} | undefined> {
        let memberFind: Member = await this.memberService.findByFields({
            where: { username: memberDTO.username}
        });

        const validatePassword = await bcrypt.compare(memberDTO.password, memberFind.password);

        if ( !memberFind || !validatePassword ) {
            throw new UnauthorizedException();
        }

        // Payload에 넣어줄 값을 설정한다.
        const payload: Payload = {id: memberFind.id, username: memberFind.username};

        return {
            accessToken: this.jwtService.sign(payload)
        };
    }

    async tokenValidateMember(payload: Payload): Promise<Member | undefined> {
        return await this.memberService.findByFields({
            where: {id: payload.id}
        })
    }
}
