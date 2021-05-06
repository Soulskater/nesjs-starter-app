import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CarType } from "../models/car-type";
import { CarsService } from "../services/cars.service";
import { CarInput } from "../inputs/car.input";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../../security/guards/graphql-auth.guard";

@Resolver()
export class CarsResolver {
  constructor(
    private carsService: CarsService
  ) {
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => [CarType])
  async cars(): Promise<CarType[]> {
    return await this.carsService.findAll() as CarType[];
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CarType)
  async createCar(@Args('input', { type: () => CarInput }) input: CarInput): Promise<CarType> {
    return await this.carsService.create(input) as CarType;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => String)
  async deleteCar(@Args('id', { type: () => String }) id: string): Promise<string> {
    await this.carsService.delete(id);
    return id;
  }
}
