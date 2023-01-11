import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MemberService } from './member.service';
import { MemberAuthorityRepository } from './repository/member-authority.repository';
import { MemberRepository } from './repository/member.repository';
import { JwtStrategy } from './security/passport.jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([MemberRepository, MemberAuthorityRepository]),
    JwtModule.register({
      secret: "SECRET_KEY",
      signOptions: {expiresIn: '300s'}
    }),
    PassportModule
  ],
  exports: [TypeOrmModule],
  controllers: [AuthController],
  providers: [AuthService, MemberService, JwtStrategy]
})
export class AuthModule {}
