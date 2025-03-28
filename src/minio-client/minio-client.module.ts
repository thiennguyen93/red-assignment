import { Module } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
import { MinioModule } from 'nestjs-minio-client';
import { ApiConfigService } from 'src/config/config.service';
import { ApiConfigModule } from 'src/config/config.module';

@Module({
  imports: [
    ApiConfigModule,
    MinioModule.registerAsync({
      imports: [ApiConfigModule],
      inject: [ApiConfigService],
      useFactory: (configService: ApiConfigService) => ({
        endPoint: configService.minio.endPoint,
        port: configService.minio.port,
        useSSL: configService.minio.useSSL,
        accessKey: configService.minio.accessKey,
        secretKey: configService.minio.secretKey,
      }),
    }),
  ],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule {}
