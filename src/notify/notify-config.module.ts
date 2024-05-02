import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';

import notifyConfig from './notify.config';

const ENV_FILE_PATH = 'apps/notify/notify.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [notifyConfig],
      envFilePath: ENV_FILE_PATH,
    }),
    EmailSubscriberModule,
  ],
})
export class NotifyConfigModule {}
