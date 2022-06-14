import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('company')
export class Company{
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({unique:true})
  // companyId: string;

  @Column()
  position: string;

  @Column()
  compensation: number;

  @Column()
  content: string;

  @Column()
  tech: string;

}
