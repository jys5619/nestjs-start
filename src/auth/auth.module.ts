import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Member } from './entity/member.entity';
import { MemberService } from './member.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member]),
    JwtModule.register({
      secret: "SECRET_KEY",
      signOptions: {expiresIn: '300s'}
    })
  ],
  exports: [TypeOrmModule],
  controllers: [AuthController],
  providers: [AuthService, MemberService]
})
export class AuthModule {}
