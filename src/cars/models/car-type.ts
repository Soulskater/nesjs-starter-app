import { Field, ObjectType } from "@nestjs/graphql";
import { CarBrand } from "../enums/car-brand";

@ObjectType()
export class CarType {
  @Field(() => String)
  id: string;
  @Field(() => CarBrand)
  brand: CarBrand;
  @Field(() => String)
  type: string;
  @Field(() => String)
  engineType: string;
  @Field(() => String)
  color: string;
  @Field(() => Date)
  releaseDate: Date;
}
