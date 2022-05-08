import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@student-hive/interfaces';
import { AuthUsersService } from '../auth-users/auth-users.service';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authUsersService: AuthUsersService,
    private jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // skip if there is no requried roles
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    const { headers } = context.switchToHttp().getRequest();

    // validate that the request contains the jwt access token
    if (!headers || !headers.authorization) {
      return false;
    }

    // extract information from the acccess token
    const jwt = <{ email?: string; sub?: string; iat?: number; exp?: number }>(
      this.jwtService.decode(headers.authorization.replace('Bearer ', ''))
    );

    // validate that the token contains an email
    if (!jwt.email) {
      return false;
    }

    // fetch a user based on the email and check their role
    const user = await this.authUsersService.findOne(jwt.email);
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
