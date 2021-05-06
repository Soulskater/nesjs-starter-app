import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { AuthService } from "./services/auth.service";
import { JwtStrategy } from "./services/jwt-strategy.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { LocalStrategy } from "./services/local-strategy.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ConfigKey } from "../shared/enums/config-key";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./controllers/auth.controller";
import { GqlAuthGuard } from "./guards/graphql-auth.guard";

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: User.collectionName, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot({
      envFilePath: 'local.env',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(ConfigKey.jwtSecret)
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [
    AuthController
  ],
  providers: [AuthService, JwtStrategy, LocalAuthGuard, LocalStrategy, GqlAuthGuard
  ],
})
export class SecurityModule {
}
