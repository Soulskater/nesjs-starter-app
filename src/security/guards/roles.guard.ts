import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from "../enums/user-role";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const type = context.getType<'graphql'>();
    const request = type === "graphql" ? this.getGraphqlRequest(context) : context.switchToHttp().getRequest();
    return requiredRoles.some((role) => !request.user || request.user?.roles?.includes(role));
  }

  private getGraphqlRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
