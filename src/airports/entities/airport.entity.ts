import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RunwayEntity } from './runway.entity';

@Entity({ name: 'Airports' })
export class AirportEntity {
  @PrimaryGeneratedColumn('uuid')
  airportId: string;

  @Index({ unique: true })
  @Column({ nullable: true })
  airportIcao?: string;

  @Index()
  @Column({ nullable: false })
  airportName: string;

  @Column({ nullable: false, type: 'float' })
  airportLat: number;

  @Column({ nullable: false, type: 'float' })
  airportLong: number;

  @Column({ type: 'int', nullable: false })
  airportElevation: number;

  @Column({ type: 'int', nullable: false })
  airportSize: number;

  @Column({ nullable: false })
  isClosed: boolean;

  @OneToMany(() => RunwayEntity, (runway) => runway.airport, { cascade: true })
  runways: RunwayEntity[];
}
