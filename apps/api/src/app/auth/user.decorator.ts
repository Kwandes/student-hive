import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IJwtInfo } from '@student-hive/interfaces';

export const AuthUser = createParamDecorator<IJwtInfo>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
