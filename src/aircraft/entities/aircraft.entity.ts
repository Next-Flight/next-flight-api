import { CompanyEntity } from 'src/companies/entities/company.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AirportEntity } from '../../airports/entities/airport.entity';

@Entity({ name: 'Aicrafts' })
export class AircraftEntity {
  @PrimaryGeneratedColumn('uuid')
  aircraftId: string;

  @Column({ nullable: false })
  aircraftRegistration: string;

  @Column({ nullable: false, type: 'float' })
  aircraftCondition: number;

  @Column({ nullable: false, type: 'float' })
  aircraftEnginesCondition: number;

  @Column({ nullable: false, type: 'float' })
  aircraftFlightHours: number;

  @Column({ nullable: false, type: 'float' })
  aircraftPositionLat: number;

  @Column({ nullable: false, type: 'float' })
  aircraftPositionLong: number;

  @Column({ nullable: false })
  aircraftIsFlying: boolean;

  @ManyToOne(() => AirportEntity)
  aircraftLastAirport: AirportEntity;

  @Column({ nullable: false, type: 'int' })
  aircraftEconomySeats: number;

  @Column({ nullable: false, type: 'int' })
  aircraftBusinessSeats: number;

  @Column({ nullable: false, type: 'int' })
  aircraftFirstSeats: number;

  @Column({ nullable: false, type: 'int' })
  aircraftExtraCargo: number;

  @Column({ nullable: false })
  aircraftIsRented: boolean;

  /**
   * Price per flight hour, set when aircraft gets rented
   */
  @Column({ nullable: true, type: 'int' })
  aircraftRentingRate: number;

  @Column({ nullable: false })
  aircraftIsAvailableForRent: boolean;

  @Column({ nullable: false })
  aircraftIsAvailableForPurchase: boolean;

  @ManyToOne(() => CompanyEntity, (company) => company.companyAircraft)
  aircraftOwnerCompany: CompanyEntity;
}
