import { Module } from '@nestjs/common';
import { ApiConfigService } from './config.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [ConfigService, ApiConfigService],
  exports: [ApiConfigService],
})
export class ApiConfigModule {}
