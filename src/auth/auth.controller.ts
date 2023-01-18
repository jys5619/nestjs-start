import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { MemberDTO } from './dto/member.dto';
import { AuthGuard } from './security/auth.guard';
import { Member } from '../domain/member.entity';
import { RolesGuard } from './security/roles.guard';
import { Roles } from './decorator/role.decorator';
import { RoleType } from './role-type';

@Controller('auth')
@ApiTags('AUTH API')
export class AuthController {
    
    constructor(private authService: AuthService) {}

    @Post('/register')
    @ApiOperation({ summary: 'Member register API', description: 'Member register' })
    @ApiCreatedResponse({ description: '{"username":"coder1","password":"1111"}', type: Member })
    async register(@Req() req: Request, @Body() memberDTO: MemberDTO): Promise<any> {
        return await this.authService.registerMember(memberDTO);
    }

    @Post('/login')
    @ApiBody({ type: MemberDTO })
    @ApiOperation({ summary: 'Member login API', description: 'Member login' })
    @ApiCreatedResponse({ description: '{"username":"coder1","password":"1111"}', type: Member })
    async login(@Body() memberDTO: MemberDTO, @Res() res: Response): Promise<any> {
        const jwt = await this.authService.validateMember(memberDTO);
        res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
        return res.json(jwt);
    }

    @Get('/authenticate')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Jwt Auth', description: 'Jwt Auth' })
    @ApiBearerAuth('JWT-auth')  // swagger의 option에 설정되있는 명
    isAuthenticated(@Req() req: Request): any {
        const member: any = req.user;
        return member;
    }

    @Get('/admin-role')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RoleType.ADMIN)
    @ApiBearerAuth('JWT-auth')  // swagger의 option에 설정되있는 명
    adminRoleCheck(@Req() req: Request): any {
        console.log(req.user);
        const user: any = req.user;
        return user;
    }
}
