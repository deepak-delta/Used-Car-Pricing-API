import {
  IsString,
  IsNumber,
  min,
  max,
  IsLongitude,
  isLatitude,
  Min,
  Max,
  IsLatitude,
} from 'class-validator';
import { isNumber } from 'util';

export class CreateReportDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(2025)
  year: number;

  @IsNumber()
  @Min(0)
  @Max(100000)
  mileage: number;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;
}
