import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../security/guards/jwt-auth.guard";
import { CarsService } from "../services/cars.service";
import { CreateCarDto } from "../dto/create-car.dto";
import { Car } from "../schemas/car.schema";
import { LeanDocument } from "mongoose";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @Get()
  async get(): Promise<LeanDocument<Car[]>> {
    return this.carsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getCarById(@Param('id') id: string): Promise<LeanDocument<Car>> {
    return this.carsService.find(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCarDto: CreateCarDto): Promise<LeanDocument<Car>> {
    return this.carsService.create(createCarDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    await this.carsService.delete(id);
    return id;
  }
}
