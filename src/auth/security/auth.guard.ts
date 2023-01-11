import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import { Observable } from "rxjs";

/**
 * UseGuard에 넣어 주면 Request에 member값을 반환한다.
 */
@Injectable()
export class AuthGuard extends NestAuthGuard('jwt') {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context);
    }
}