import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company.entity";
import { User } from "./user.entity";

@Entity('application')
export class Application {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    companyId: number;

    @Column()
    position: string;
  
    @Column()
    compensation: number;
  
    @Column()
    content: string;
  
    @Column()
    tech: string;

    @OneToOne(() => User, user => user.application, { nullable: true })
    @JoinColumn()
    user: User;

    @ManyToOne(() => Company, company => company.application, { nullable: true, createForeignKeyConstraints: false })
    company: Company;
  

}