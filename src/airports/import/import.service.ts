import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { AirportsService } from '../airports.service';
import * as fs from 'fs/promises';
import { AirportEntity } from '../entities/airport.entity';
import { RunwayEntity } from '../entities/runway.entity';
import { RUNWAY_SURFACE_TYPES } from '../dto/runway-surface-types.enum';
import { DeepPartial } from 'typeorm';

@Injectable()
export class ImportService {
  importsPath = join(__dirname, '..', '..', '..', 'imports');

  constructor(private airportService: AirportsService) {
    // this.parseAirportFile();
  }

  async parseAirportFile() {
    const filePath = join(this.importsPath, 'Airports.txt');

    const fileContents = await fs.readFile(filePath);
    const lines = fileContents
      .toString()
      .split('\n')
      .map((line) => line.trim());

    // Start at line 3
    const lineIndex = 2;
    let nextAirportIndex = await this.parseAirport(lines, lineIndex);
    let i = 0;
    while (nextAirportIndex < lines.length) {
      nextAirportIndex = await this.parseAirport(lines, nextAirportIndex);
      i++;
    }
    console.log('done airport count', i);
  }

  async parseAirport(contents: string[], lineIndex) {
    const startIndex = lineIndex;
    const airportLine = contents[lineIndex];
    let nextLineContents = contents[++lineIndex];
    while (nextLineContents !== '') {
      nextLineContents = contents[++lineIndex].trim();
    }
    const runwayLines = contents.slice(startIndex + 1, lineIndex);
    const airportLineSplits = airportLine.split(',');
    const airport: DeepPartial<AirportEntity> = {
      airportIcao: airportLineSplits[1],
      airportName: airportLineSplits[2],
      airportLat: Number(airportLineSplits[3]),
      airportLong: Number(airportLineSplits[4]),
      airportElevation: Math.round(Number(airportLineSplits[5])),
    };

    const runways: Partial<RunwayEntity>[] = [];
    for (const runway of runwayLines) {
      const splits = runway.split(',');
      runways.push({
        runwayDesignation: splits[1],
        runwayHeading: Math.round(Number(splits[2])),
        runwayLength: Math.round(Number(splits[3])),
        runwayWidth: Math.round(Number(splits[4])),
        runwayHasILS: Boolean(Number(splits[5])),
        runwayILSFrequency: Number(splits[6]),
        runwayILSHeading: Number(splits[7]),
        runwayLat: Number(splits[8]),
        runwayLong: Number(splits[9]),
        runwayElevation: Math.round(Number(splits[10])),
        runwayGlideslopeAngle: Number(Number(splits[11])),
        runwayThresholdheight: Math.round(Number(splits[12])),
        runwaySurfaceType: Math.round(Number(splits[13])),
        runwayIsClosed: Boolean(Number(splits[14])),
      });
    }
    airport.runways = runways;
    const classifiedAirport = this.classifyAirport(airport, airport.runways);

    await this.airportService.updateAirport(classifiedAirport);
    return lineIndex + 1;
  }

  classifyAirport(
    airport: DeepPartial<AirportEntity>,
    runways: DeepPartial<RunwayEntity>[],
  ) {
    airport.isClosed = runways.every((runway) => runway.runwayIsClosed);

    const openRunways = runways.filter((runway) => !runway.runwayIsClosed);

    // For Size 5: At least 2 concrete / composite runways with length of at least 10000 feet
    // For Size 4: At least 2 concrete / composite runway with length of at least 8000 feet
    // For Size 3: At least 1 concrete / composite runway with length of at least 6000 feet
    // For Size 2: At least 1 concrete / composite runway
    // For Size 1: Default

    airport.airportSize = 1;

    const isSize5 =
      openRunways.filter(
        (runway) =>
          runway.runwayLength >= 10000 &&
          runway.runwaySurfaceType !== RUNWAY_SURFACE_TYPES.DIRT_GRASS,
      ).length >= 4;
    if (isSize5) {
      airport.airportSize = 5;
      return airport;
    }

    const isSize4 =
      openRunways.filter(
        (runway) =>
          runway.runwayLength >= 8000 &&
          runway.runwaySurfaceType !== RUNWAY_SURFACE_TYPES.DIRT_GRASS,
      ).length >= 4;
    if (isSize4) {
      airport.airportSize = 4;
      return airport;
    }

    const isSize3 =
      openRunways.filter(
        (runway) =>
          runway.runwayLength >= 6000 &&
          runway.runwaySurfaceType !== RUNWAY_SURFACE_TYPES.DIRT_GRASS,
      ).length >= 2;
    if (isSize3) {
      airport.airportSize = 3;
      return airport;
    }

    const isSize2 =
      openRunways.filter(
        (runway) =>
          runway.runwaySurfaceType !== RUNWAY_SURFACE_TYPES.DIRT_GRASS,
      ).length >= 2;
    if (isSize2) {
      airport.airportSize = 2;
      return airport;
    }

    return airport;
  }
}
