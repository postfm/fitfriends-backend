import { Module } from '@nestjs/common';
import { FileStoreService } from './file-store.service';
import { FileStoreController } from './file-store.controller';
import { ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.get<string>('STORE_DIRECTORY_PATH');
        const staticRoot = configService.get<string>('STATIC_ROOT');

        return [
          {
            rootPath,
            staticRoot,
            serveStaticOptions: {
              fallthrough: true,
              etag: true,
            },
          },
        ];
      },
    }),
  ],

  controllers: [FileStoreController],
  providers: [FileStoreService],
})
export class FileStoreModule {}
