import { Module } from '@nestjs/common';
import { ImportService } from './import/import.service';
import { AirportsService } from './airports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirportEntity } from './entities/airport.entity';
import { RunwayEntity } from './entities/runway.entity';

@Module({
  providers: [ImportService, AirportsService],
  imports: [TypeOrmModule.forFeature([AirportEntity, RunwayEntity])],
})
export class AirportsModule {}
