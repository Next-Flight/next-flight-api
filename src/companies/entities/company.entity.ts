import { AircraftEntity } from 'src/aircraft/entities/aircraft.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BalanceChangeEntity } from './balance-change.entity';

@Entity({ name: 'Companies' })
export class CompanyEntity {
  @PrimaryGeneratedColumn('uuid')
  companyId: string;

  @Index({ unique: true })
  @Column({ nullable: false })
  companyIcao: string;

  @Column({ nullable: false })
  companyName: string;

  @ManyToOne(() => UserEntity, (user) => user.userCompanies)
  companyOwner: UserEntity;

  @OneToMany(() => AircraftEntity, (aircraft) => aircraft.aircraftOwnerCompany)
  companyAircraft: AircraftEntity[];

  @Column({ nullable: false, type: 'int' })
  companyBalance: number;

  @Column({ nullable: true })
  companyPictureUrl: string;

  @OneToMany(
    () => BalanceChangeEntity,
    (balanceChange) => balanceChange.balanceChangeCompany,
  )
  companyBalanceChanges: BalanceChangeEntity[];

  @Column({ nullable: false, type: 'float' })
  companyReputation: number;
}
