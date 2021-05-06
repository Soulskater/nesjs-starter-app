import { CarsController } from "./cars.controller";
import { CarsService } from "../services/cars.service";
import { Test } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { Car } from "../schemas/car.schema";
import { CarBrand } from "../enums/car-brand";

describe('CarsController', () => {
  let carsController: CarsController;
  let carsService: CarsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CarsController],
      providers: [CarsService,
        {
          provide: getModelToken(Car.name),
          useValue: { find: () => Promise.resolve([]) },
        }],
    }).compile();

    carsService = moduleRef.get<CarsService>(CarsService);
    carsController = moduleRef.get<CarsController>(CarsController);
  });

  describe('findAll', () => {
    it('should return an array of cars', async () => {
      const result: Car[] = [{
        id: "test-id",
        brand: CarBrand.Audi,
        color: 'black',
        engineType: "",
        type: "",
        releaseDate: new Date()
      }];
      jest.spyOn(carsService, 'findAll').mockImplementation(() => Promise.resolve(result));

      expect(await carsController.get()).toBe(result);
    });
  });

  describe('find', () => {
    it('should return a car', async () => {
      const result: Car = {
        id: 'test-id',
        brand: CarBrand.Audi,
        color: 'black',
        engineType: "",
        type: "",
        releaseDate: new Date()
      };
      jest.spyOn(carsService, 'find').mockImplementation(() => Promise.resolve(result));

      expect(await carsController.getCarById('test-id')).toBe(result);
    });
  });
});
