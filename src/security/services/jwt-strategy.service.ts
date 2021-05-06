import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigKey } from "../../shared/enums/config-key";
import { JwtPayload } from "../../shared/interfaces/jwt-payload";
import { UserAuthData } from "../../shared/interfaces/user";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(ConfigKey.jwtSecret),
    });
  }

  public validate(payload: JwtPayload): UserAuthData {
    return { id: payload.sub, email: payload.email, roles: payload.roles };
  }
}
