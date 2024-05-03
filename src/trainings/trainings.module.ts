import { Module } from '@nestjs/common';
import { TrainingsService } from './trainings.service';
import { TrainingsController } from './trainings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from './entities/training.entity';
import { NotifyService } from './notify/notify.service';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [TypeOrmModule.forFeature([Training]), NotifyModule],
  controllers: [TrainingsController],
  providers: [TrainingsService, NotifyService],
})
export class TrainingsModule {}
