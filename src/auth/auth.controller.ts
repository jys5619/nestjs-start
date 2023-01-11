import { Body, Controller, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
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
    async login(@Body() memberDTO: MemberDTO, @Res() res: Response): Promise<any> {
        const jwt = await this.authService.validateMember(memberDTO);
        res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
        return res.json(jwt);
    }
}
