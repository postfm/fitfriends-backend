import { Module } from '@nestjs/common';
import { TrainingsService } from './trainings.service';
import { TrainingsController } from './trainings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from './entities/training.entity';
import { MailModule } from 'src/notify/mail/mail.module';
import { MailService } from 'src/notify/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Training]), MailModule],
  controllers: [TrainingsController],
  providers: [TrainingsService, MailService],
})
export class TrainingsModule {}
