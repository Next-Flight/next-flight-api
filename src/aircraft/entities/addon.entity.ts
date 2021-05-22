import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SIMULATORS } from '../dto/simulators.enum';
import { AircraftTypeEntity } from './aircraft-type.entity';

@Entity({ name: 'Addons' })
export class AddonEntity {
  @PrimaryGeneratedColumn('uuid')
  addonId: string;

  @Column({ enum: SIMULATORS, nullable: false })
  addonSimulator: SIMULATORS;

  @Column({ nullable: false })
  addonIdentifier: string;

  @Column({ nullable: false, type: 'float' })
  addonFFCorrection: number;

  @ManyToOne(
    () => AircraftTypeEntity,
    (aircraftType) => aircraftType.aircraftAddons,
  )
  aircraftType: AircraftTypeEntity;
}
