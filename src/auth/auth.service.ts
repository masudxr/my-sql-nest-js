import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from 'src/uencrypt/bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    console.log('Inside ValidateUser');
    const userDB = await this.userService.findUserByname(username);
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

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
