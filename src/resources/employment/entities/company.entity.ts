import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Application } from './application.entity';

@Entity('company')
export class Company{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  region: string;

  @OneToMany(() => Application, application => application.company)
  application: Application[];


}
