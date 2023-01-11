import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Member } from "../entity/member.entity";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {
        
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if ( !roles ) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const member = request.user as Member;

        return !!member?.authorities?.some(role => roles.includes(role));

    }
}