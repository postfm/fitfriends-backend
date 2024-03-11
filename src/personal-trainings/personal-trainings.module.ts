import { Module } from '@nestjs/common';
import { PersonalTrainingsService } from './personal-trainings.service';
import { PersonalTrainingsController } from './personal-trainings.controller';

@Module({
  controllers: [PersonalTrainingsController],
  providers: [PersonalTrainingsService],
})
export class PersonalTrainingsModule {}
