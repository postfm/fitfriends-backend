import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../roles/role.enum';
import { ROLES_KEY } from '../roles/roles.decorator';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub?: number;
  email?: string;
  roles?: string[];
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const user = jwtDecode<JwtPayload>(token);

    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
