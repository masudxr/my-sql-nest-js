import { Injectable } from '@nestjs/common';
import { comparePasswords } from 'src/uencrypt/bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(username: string, password: string) {
    console.log('Inside ValidateUser');
    const userDB = await this.userService.findUserByname(username);
    // const usermailDB = await this.userService.findUserBymail(email);
    if (userDB) {
      const matched = comparePasswords(password, userDB.password);
      if (matched) {
        console.log('User Validation Success!');
        return userDB;
      } else {
        console.log('Password do not match');
        return null;
      }
    }
    console.log('User Validation Failed!');
    return null;
  }
}
