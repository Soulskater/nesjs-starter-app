import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../../../shared/interfaces/jwt-payload";
import { UserAuthData } from "../../../shared/interfaces/user";

export class MockJwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "mock-secret",
    });
  }

  authenticate(req: any, options?: any) {
    this.pass();
  }

  public validate(payload: JwtPayload): UserAuthData {
    return { id: payload.sub, email: payload.email, roles: payload.roles };
  }
}
