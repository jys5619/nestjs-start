import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { MemberDTO } from './dto/member.dto';

@Controller('auth')
@ApiTags('AUTH API')
export class AuthController {
    
    constructor(private authService: AuthService) {}

    @Post('/register')
    async register(@Req() req: Request, @Body() memberDTO: MemberDTO): Promise<any> {
        return await this.authService.registerMember(memberDTO);
    }

    @Post('/login')
    async login(@Body() memberDTO: MemberDTO): Promise<any> {
        return await this.authService.validateMember(memberDTO);
    }
}
