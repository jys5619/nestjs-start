import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
}
