import { Module } from '@nestjs/common';
import { CarsResolver } from "./resolvers/cars.resolver";
import { Car, CarSchema } from "./schemas/car.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { CarsService } from "./services/cars.service";
import { CarsController } from "./controllers/cars.controller";

@Module({
  imports: [MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }])],
  controllers: [CarsController],
  providers: [CarsResolver, CarsService],
})
export class CarsModule {
}
