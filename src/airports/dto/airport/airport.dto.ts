import { RunwayDto } from '../runway/runway.dto';

export class AirportDto {
  airportId: string;
  airportIcao?: string;
  airportName: string;
  airportLat: number;
  airportLong: number;
  airportElevation: number;
  airportSize: number;
  isClosed: boolean;
  runways?: RunwayDto[];
}
