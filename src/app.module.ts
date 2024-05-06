import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingsModule } from './trainings/trainings.module';
import { ReviewsModule } from './reviews/reviews.module';
import { OrdersModule } from './orders/orders.module';
import { PersonalTrainingsModule } from './personal-trainings/personal-trainings.module';
import { AlertsModule } from './alerts/alerts.module';
import { BalancesModule } from './balances/balances.module';
import { FileStoreModule } from './file-store/file-store.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { FriendsModule } from './friends/friends.module';
import { SubscriberModule } from './notify/subscriber/subscriber.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './notify/mail/mail.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitmqConnectionString } from './helpers/common';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_SMTP_HOST'),
          port: configService.get('MAIL_SMTP_PORT'),
          ignoreTLS: true,
          secure: false,
        },
        auth: {
          user: configService.get('MAIL_USER_NAME'),
          pass: configService.get('MAIL_USER_PASSWORD'),
        },
        defaults: {
          from: configService.get('MAIL_FROM'),
        },
        template: {
          dir: __dirname + '/assets',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
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
    TrainingsModule,
    ReviewsModule,
    OrdersModule,
    PersonalTrainingsModule,
    AlertsModule,
    BalancesModule,
    FileStoreModule,
    FriendsModule,
    SubscriberModule,
    MailModule,
    NotifyModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
