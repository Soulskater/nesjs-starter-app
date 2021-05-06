import { Field, InputType } from "@nestjs/graphql";
import { CarBrand } from "../enums/car-brand";

@InputType()
export class CarInput {
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
