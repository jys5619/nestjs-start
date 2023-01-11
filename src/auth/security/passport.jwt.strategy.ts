import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Payload } from './payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService) {
        // Bearer 토큰 을 받아서 검증한다.
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: 'SECRET_KEY'
        })
    }

    // Payload는 위 supper에서 암호를 풀어서 나온 payload값이다.
    // Payload 값에서 사용자 정보를 조회한다.
    async validate(payload: Payload, done: VerifiedCallback): Promise<any> {
        const member = await this.authService.tokenValidateMember(payload);
        if ( !member ) {
            return done(new UnauthorizedException({message: 'user does not exist'}), false);
        }

        // Request.member에 member값을 넣어준다.
        return done(null, member);
    }
}