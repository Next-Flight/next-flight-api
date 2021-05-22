import { PickType } from '@nestjs/mapped-types';
import { AirportDto } from './airport.dto';

export class CreateAirportDto extends PickType(AirportDto, [
  'airportIcao',
  'airportLat',
  'airportLong',
  'airportName',
  'airportElevation',
] as const) {}
