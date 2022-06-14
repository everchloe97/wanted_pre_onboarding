import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Application } from './application.entity';

@Entity('user')
export class User{
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Application, application => application.user, { nullable: true })
  application: Application;

}