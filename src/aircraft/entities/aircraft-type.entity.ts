import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AIRCRAFT_CATEGORIES } from '../dto/aircraft-categories.enum';
import { FUEL_TYPES } from '../dto/fuel-types.enum';
import { AddonEntity } from './addon.entity';

@Entity({ name: 'Aircraft-Types' })
export class AircraftTypeEntity {
  @PrimaryGeneratedColumn('uuid')
  aircraftTypeId: string;

  /**
   * Icao code for the aircraft
   */
  @Index({ unique: true })
  @Column({ nullable: false })
  aircraftTypeIcao: string;

  /**
   * Licence type for the aircraft
   */
  @Column({ enum: AIRCRAFT_CATEGORIES, nullable: false })
  aircraftCategory: AIRCRAFT_CATEGORIES;

  /**
   * Fuel type of the aircraft
   */
  @Column({ enum: FUEL_TYPES, nullable: false })
  aircraftFuelType: FUEL_TYPES;

  /**
   * Fuel capacity in kg
   */
  @Column({ type: 'int', nullable: false })
  aircraftFuelCapacity: number;

  /**
   * Fuel burn in cruise in kg/hr
   */
  @Column({ type: 'float', nullable: false })
  aircraftCruiseFF: number;

  /**
   * Empty weight in kgs
   */
  @Column({ type: 'int', nullable: false })
  aircraftEmptyWeight: number;

  /**
   * Max Payload in kgs
   */
  @Column({ type: 'int', nullable: false })
  aircraftMaxPayload: number;

  @Column({ nullable: false })
  aircraftNeedsCopilot: boolean;

  /**
   * Maximum amount of economy seats
   */
  @Column({ nullable: false, type: 'int' })
  aircraftMaxEcoSeats: number;

  /**
   * Maximum Gross Weight in kgs
   */
  @Column({ nullable: false, type: 'int' })
  aircraftMaximumGrossWeight: number;

  /**
   * Amount of flight hours until a small check is needed
   */
  @Column({ nullable: false, type: 'int' })
  aircraftSmallCheckInterval: number;

  /**
   * Amount of flight hours until a medium check is needed
   */
  @Column({ nullable: false, type: 'int' })
  aircraftMediumCheckInterval: number;

  /**
   * Amount of flight hours until a large check is needed
   */
  @Column({ nullable: false, type: 'int' })
  aircraftLargeCheckInterval: number;

  /**
   * Amount of engine degredation per flight hour
   */
  @Column({ nullable: false, type: 'float' })
  aircraftEngineDegradationPerHour: number;

  /**
   * Amount of airframe degredation per flight hour
   */
  @Column({ nullable: false, type: 'float' })
  aircraftAirframeDegradationPerHour: number;

  /**
   * Small check price
   */
  @Column({ nullable: false, type: 'int' })
  aircraftSmallCheckPrice: number;

  /**
   * Medium check price
   */
  @Column({ nullable: false, type: 'int' })
  aircraftMediumCheckPrice: number;

  /**
   * Large check price
   */
  @Column({ nullable: false, type: 'int' })
  aircraftLargeCheckPrice: number;

  /**
   * Engines price
   */
  @Column({ nullable: false, type: 'int' })
  aircraftEnginesPrice: number;

  /**
   * Airframe price
   */
  @Column({ nullable: false, type: 'int' })
  aircraftAirframePrice: number;

  /**
   * Aircraft price (new)
   */
  @Column({ nullable: false, type: 'int' })
  aircraftPrice: number;

  /**
   * Aircraft minumum Airport Size (For generation and flight planning)
   */
  @Column({ nullable: false, type: 'int' })
  aircraftMinimumAirportSize: number;

  @Column({ nullable: false })
  aircraftManufacturer: string;

  @Column({ nullable: false })
  aircraftFullName: string;

  @OneToMany(() => AddonEntity, (addon) => addon.aircraftType)
  aircraftAddons: AddonEntity[];
}
