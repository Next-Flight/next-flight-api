import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyEntity } from './company.entity';

@Entity({ name: 'Balance-Changes' })
export class BalanceChangeEntity {
  @PrimaryGeneratedColumn('uuid')
  balanceChangeId: string;

  @ManyToOne(() => CompanyEntity, (company) => company.companyBalanceChanges)
  balanceChangeCompany: CompanyEntity;

  @Column({ nullable: false })
  balanceChangeReason: string;

  @Column({ nullable: false, type: 'int' })
  balanceChangeAmount: number;

  @Column({ nullable: false, type: 'int' })
  balanceChangeOldAmount: number;

  @Column({ nullable: false, type: 'int' })
  balanceChangeNewAmount: number;

  @CreateDateColumn({ nullable: false })
  balanceChangeDatetime: Date;

  /**
   * NULL if recipient is system
   */
  @ManyToOne(() => CompanyEntity, { nullable: true })
  balanceChangeRecipient: CompanyEntity;
}
