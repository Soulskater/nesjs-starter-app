import { CarBrand } from "../enums/car-brand";
import { IsDateString, IsNotEmpty } from "class-validator";

export class CreateCarDto {
  @IsNotEmpty()
  brand: CarBrand;
  @IsNotEmpty()
  type: string;
  @IsNotEmpty()
  engineType: string;
  @IsNotEmpty()
  color: string;
  @IsDateString()
  releaseDate: Date;
}
