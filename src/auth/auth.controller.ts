import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { MemberDTO } from './dto/member.dto';
import { AuthGuard } from './security/auth.guard';
import { Member } from './entity/member.entity';

@Controller('auth')
@ApiTags('AUTH API')
export class AuthController {
    
    constructor(private authService: AuthService) {}

    @Post('/register')
    async register(@Req() req: Request, @Body() memberDTO: MemberDTO): Promise<any> {
        return await this.authService.registerMember(memberDTO);
    }

    @Post('/login')
    @ApiBody({ type: MemberDTO })
    @ApiOperation({ summary: 'Member login API', description: 'Member login' })
    @ApiCreatedResponse({ description: '{"username":"coder3","password":"3333"}', type: Member })
    async login(@Body() memberDTO: MemberDTO, @Res() res: Response): Promise<any> {
        const jwt = await this.authService.validateMember(memberDTO);
        res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
        return res.json(jwt);
    }

    @Get('/authenticate')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Jwt Auth', description: 'Jwt Auth' })
    @ApiCreatedResponse({ description: '{"username":"coder3","password":"3333"}', type: Member })
    @ApiBearerAuth('JWT-auth')  // swagger의 option에 설정되있는 명
    isAuthenticated(@Req() req: Request): any {
        const member: any = req.user;
        return member;
    }
}
