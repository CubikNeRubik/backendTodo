import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<Set<string>>('roles', context.getHandler());
        if (!requiredRoles) {
            // by default allowed 
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        if (user) {
            return requiredRoles.has(user.role);
        }

        throw new UnauthorizedException();
    }
}