import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RUNWAY_SURFACE_TYPES } from '../dto/runway-surface-types.enum';
import { AirportEntity } from './airport.entity';

@Entity({ name: 'Runways' })
export class RunwayEntity {
  @PrimaryGeneratedColumn('uuid')
  runwayId: string;

  @Column({ nullable: false })
  runwayDesignation: string;

  @Column({ type: 'int', nullable: false })
  runwayHeading: number;

  @Column({ type: 'int', nullable: false })
  runwayLength: number;

  @Column({ type: 'int', nullable: false })
  runwayWidth: number;

  @Column({ nullable: false })
  runwayHasILS: boolean;

  @Column({ nullable: true, type: 'float' })
  runwayILSFrequency?: number;

  @Column({ nullable: true, type: 'int' })
  runwayILSHeading?: number;

  @Column({ nullable: false, type: 'float' })
  runwayLat: number;

  @Column({ nullable: false, type: 'float' })
  runwayLong: number;

  @Column({ nullable: false, type: 'int' })
  runwayElevation: number;

  @Column({ nullable: false, type: 'float' })
  runwayGlideslopeAngle: number;

  @Column({ nullable: false, type: 'int' })
  runwayThresholdheight: number;

  @Column({
    nullable: false,
    enum: RUNWAY_SURFACE_TYPES,
    default: RUNWAY_SURFACE_TYPES.UNKNOWN,
  })
  runwaySurfaceType: RUNWAY_SURFACE_TYPES;

  @Column({ nullable: false })
  runwayIsClosed: boolean;

  @ManyToOne(() => AirportEntity, (airport) => airport.runways)
  airport: AirportEntity;
}
