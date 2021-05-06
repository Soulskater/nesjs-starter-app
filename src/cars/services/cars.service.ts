import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Car, CarDocument } from '../schemas/car.schema';
import { CarInput } from "../inputs/car.input";

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) {
  }

  async create(carInput: CarInput): Promise<Car> {
    const createdCar = new this.carModel(carInput);
    return await createdCar.save();
  }

  async delete(id: string): Promise<void> {
    await this.carModel.deleteOne({ _id: Types.ObjectId(id) });
  }

  async findAll(): Promise<Car[]> {
    return this.carModel.find().exec();
  }

  async find(id: string): Promise<Car> {
    return this.carModel.findOne({ _id: Types.ObjectId(id) }).exec();
  }
}
