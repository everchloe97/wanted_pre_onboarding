import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { EmploymentService } from './employment.service';
import { Company } from './entities/company.entity';
import { EmploymentController } from './employment.controller';
import { User } from './entities/user.entity';
import { Application } from './entities/application.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Company,User,Application]),
    ConfigModule,
  ],
  controllers: [EmploymentController],
  providers: [EmploymentService],
  exports: [EmploymentService],
})
export class CompanyModule {}
