import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateAirportDto } from './dto/airport/create.dto';
import { AirportEntity } from './entities/airport.entity';
import { RunwayEntity } from './entities/runway.entity';

@Injectable()
export class AirportsService {
  constructor(
    @InjectRepository(AirportEntity)
    readonly airportRepo: Repository<AirportEntity>,
    @InjectRepository(RunwayEntity)
    readonly runwayRepo: Repository<RunwayEntity>,
  ) {}

  findAirport(id: string) {
    return this.airportRepo.findOne({ where: { airportId: id } });
  }

  findAirportByIcao(icao: string) {
    return this.airportRepo.findOne({
      where: { airportIcao: icao.toUpperCase() },
    });
  }

  findRunwaysOfAirport(id: string) {
    return this.runwayRepo.find({ where: { airport: { airportId: id } } });
  }

  findRunwaysOfAirportIcao(icao: string) {
    return this.runwayRepo.find({
      where: { airport: { airportIcao: icao.toUpperCase() } },
    });
  }

  createAirport(input: CreateAirportDto) {
    return this.airportRepo.save(input);
  }

  updateAirport(input: DeepPartial<AirportEntity>) {
    return this.airportRepo.save(input);
  }
}
