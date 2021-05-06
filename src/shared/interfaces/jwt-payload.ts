import { UserRole } from "../../security/enums/user-role";

export interface JwtPayload {
  sub: string;
  email: string;
  roles: UserRole[];
}
