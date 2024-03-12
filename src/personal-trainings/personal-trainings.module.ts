import { Module } from '@nestjs/common';
import { PersonalTrainingsService } from './personal-trainings.service';
import { PersonalTrainingsController } from './personal-trainings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalTraining } from './entities/personal-training.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonalTraining])],
  controllers: [PersonalTrainingsController],
  providers: [PersonalTrainingsService],
})
export class PersonalTrainingsModule {}
