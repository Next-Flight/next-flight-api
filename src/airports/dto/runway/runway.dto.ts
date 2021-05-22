import { AirportDto } from '../airport/airport.dto';
import { RUNWAY_SURFACE_TYPES } from '../runway-surface-types.enum';

export class RunwayDto {
  runwayId: string;
  runwayDesignation: string;
  runwayHeading: number;
  runwayLength: number;
  runwayWidth: number;
  runwayHasILS: boolean;
  runwayILSFrequency?: number;
  runwayILSHeading?: number;
  runwayLat: number;
  runwayLong: number;
  runwayElevation: number;
  runwayGlideslopeAngle: number;
  runwayThresholdheight: number;
  runwaySurfaceType: RUNWAY_SURFACE_TYPES;
  runwayIsClosed: boolean;
  airport?: AirportDto;
}
