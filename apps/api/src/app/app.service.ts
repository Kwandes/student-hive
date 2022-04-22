import { Injectable } from '@nestjs/common';
import { IMessage } from '@student-hive/interfaces';

@Injectable()
export class AppService {
  getData(): IMessage {
    return { message: 'Welcome to api!' };
  }
}
