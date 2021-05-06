import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { CarBrand } from "../enums/car-brand";

export type CarDocument = Car & Document;

@Schema()
export class Car {
  id: string;
  @Prop()
  brand: CarBrand;

  @Prop()
  type: string;

  @Prop()
  engineType: string;

  @Prop()
  color: string;

  @Prop({ type: SchemaTypes.Date })
  releaseDate: Date;
}

export const CarSchema = SchemaFactory.createForClass(Car);
