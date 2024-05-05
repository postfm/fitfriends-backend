import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitmqConnectionString } from 'src/helpers/common';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        exchanges: [
          {
            name: configService.get('RABBIT_QUEUE') as string,
            type: 'direct',
          },
        ],
        uri: getRabbitmqConnectionString({
          host: configService.get('RABBIT_HOST'),
          password: configService.get('RABBIT_PASSWORD'),
          user: configService.get('RABBIT_USER'),
          port: configService.get('RABBIT_PORT'),
        }),
        connectionInitOptions: { wait: true },
        enableControllerDiscovery: true,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [NotifyService],
  exports: [NotifyService],
})
export class NotifyModule {}
