import { Module } from '@nestjs/common';
import { TrainingsService } from './trainings.service';
import { TrainingsController } from './trainings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from './entities/training.entity';
import { MailModule } from 'src/notify/mail/mail.module';
import { MailService } from 'src/notify/mail/mail.service';
import { NotifyModule } from 'src/notify/notify.module';

@Module({
  imports: [TypeOrmModule.forFeature([Training]), MailModule, NotifyModule],
  controllers: [TrainingsController],
  providers: [TrainingsService, MailService],
})
export class TrainingsModule {}
