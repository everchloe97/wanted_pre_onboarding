import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { EmploymentService } from './employment.service';
import { Company } from './entities/company.entity';
import { EmploymentController } from './employment.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([Company]),
    ConfigModule,
  ],
  controllers: [EmploymentController],
  providers: [EmploymentService],
  exports: [EmploymentService],
})
export class CompanyModule {}
