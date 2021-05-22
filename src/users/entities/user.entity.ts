import { CompanyEntity } from 'src/companies/entities/company.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ nullable: false, select: false })
  userPassword: string;

  @Column({ nullable: false })
  userFirstName: string;

  @Column({ nullable: false })
  userName: string;

  @Column({ nullable: false, select: false })
  userEmail: string;

  @Column({ nullable: false, default: false })
  userEmailConfirmed: boolean;

  @Column({ nullable: false })
  userProfilePictureUrl: string;

  @OneToMany(() => CompanyEntity, (company) => company.companyOwner)
  userCompanies: CompanyEntity[];
}
