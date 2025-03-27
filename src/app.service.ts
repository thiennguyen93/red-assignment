import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome! This is a NestJS app by Thien Nguyen!';
  }
}
