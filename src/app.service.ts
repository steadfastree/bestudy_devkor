import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  usernames: string[];
  constructor() {
    this.usernames = ['Dominic', 'Jeff', 'Peter'];
  }

  getUsers() {
    return this.usernames;
  }

  getUsernameByIndex(index: number) {
    if (index < 0 || index >= this.usernames.length) {
      throw Error('Index out of range');
    }
    return this.usernames[index]; // 인덱스 받아서 범위 안에 있으면 해당 유저네임 출력.
  }

  createUser(index: number, username: string) {
    if (username.length <= 0) {
      throw Error('Invalid Username');
    }
    this.usernames.splice(index, 0, username);
  }

  deleteUser(index: number) {
    if (index < 0 || index >= this.usernames.length) {
      throw Error('Index out of range');
    }
    this.usernames.splice(index, 1);
  }
}
