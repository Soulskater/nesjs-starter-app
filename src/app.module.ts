import { HttpModule, Module } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql";
import { CarsModule } from "./cars/cars.module";
import { MongooseModule } from "@nestjs/mongoose";
import { SecurityModule } from "./security/security.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ConfigKey } from "./shared/enums/config-key";
import { SwaggerModule } from "@nestjs/swagger";

@Module({
  imports: [
    HttpModule,
    SwaggerModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const mongoUri = configService.get<string>(ConfigKey.mongoBaseUri);
        const mongoUser = configService.get<string>(ConfigKey.mongoUser);
        const mongoPassword = configService.get<string>(ConfigKey.mongoPassword);
        return {
          uri: mongoUri
        };
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      include: [CarsModule],
      autoSchemaFile: 'schema.gql'
    }),
    CarsModule,
    SecurityModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
