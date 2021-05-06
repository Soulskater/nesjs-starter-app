import { registerEnumType } from "@nestjs/graphql";

export enum CarBrand {
  Toyota = 'Toyota',
  Audi = 'Audi',
  Mercedes = 'Mercedes',
  Bmw = 'Bmw',
  Suzuki = 'Suzuki',
  Opel = 'Opel'
}

registerEnumType(CarBrand, { name: 'CarBrand' });
