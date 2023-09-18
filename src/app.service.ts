import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  usernames: string[];
  constructor() {
    this.usernames = ['a', 'b'];
  }

  getHello(): string {
    return 'Hello World!';
  }

  getUsernameByIndex(index: number) {
    if (index < 0 || index >= this.usernames.length) {
      throw Error('Index out of range');
    }
    return this.usernames[index];
  }
}
