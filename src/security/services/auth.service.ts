import { ConfigService } from "@nestjs/config";
import { compare, genSalt, hash } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { HttpService, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../schemas/user.schema";
import { LeanDocument, Model } from "mongoose";
import { AuthResponse } from "../interfaces/auth-response";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService,
              private configService: ConfigService,
              private httpService: HttpService,
              @InjectModel(User.collectionName) private userModel: Model<UserDocument>) {
  }

  public issueAccessToken(user: UserDocument): AuthResponse {
    const payload = { email: user.email, roles: user.roles, sub: user.id };
    const expiresAt = this.setHours(new Date(), 72);
    return {
      access_token: this.jwtService.sign(payload, { algorithm: "HS256", expiresIn: expiresAt }),
      expires_at: expiresAt
    };
  }

  public async validateUser(userEmail: string, password: string): Promise<LeanDocument<User>> {
    const user = await this.userModel.findOne({ email: userEmail });
    if (user) {
      if (await this.validatePassword(password, user.password)) {
        return user.toObject();
      }
    }
    return null;
  }

  public hashPassword(plainPassword: string): Promise<string> {
    return hash(plainPassword, 10);
  }

  public generateHash(): Promise<string> {
    return genSalt(5);
  }

  private setHours(date: Date, hours: number): number {
    return date.setTime(date.getTime() + +(hours * 60 * 60 * 1000));
  }

  private validatePassword(plainPassword: string, passwordHash: string): Promise<boolean> {
    return compare(plainPassword, passwordHash);
  }
}
