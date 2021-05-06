import { UserRole } from "../../security/enums/user-role";

export interface UserAuthData {
  id: string;
  email: string;
  roles: UserRole[]
}
