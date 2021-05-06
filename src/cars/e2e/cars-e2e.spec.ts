import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CarsModule } from "../cars.module";
import { CarsService } from "../services/cars.service";
import { CarBrand } from "../enums/car-brand";
import { getModelToken } from "@nestjs/mongoose";
import { Car } from "../schemas/car.schema";
import { AppModule } from "../../app.module";
import { JwtStrategy } from "../../security/services/jwt-strategy.service";
import { MockJwtStrategy } from "./mocks/mock-jwt-strategy";

describe('Cars', () => {
  let app: INestApplication;
  let carsService = {
    findAll: () => [{
      id: "test-id",
      brand: CarBrand.Audi,
      color: 'black',
      engineType: "",
      type: "",
      releaseDate: '2021-05-06T09:22:28.491Z'
    }]
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, CarsModule],
      providers: [
        {
          provide: getModelToken(Car.name),
          useValue: { find: () => Promise.resolve([]) },
        }
      ]
    })
      .overrideProvider(JwtStrategy)
      .useClass(MockJwtStrategy)
      .overrideProvider(CarsService)
      .useValue(carsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/get cars `, () => {
    return request(app.getHttpServer())
      .get(`/cars`)
      .expect(200)
      .expect(carsService.findAll());
  });

  afterAll(async () => {
    await app.close();
  });
});
