import { Injectable, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}

  async validateUser(username: string, password: string) {
    console.log('hello:', 'Inside ValidateUser');
    const userDB = await this.userService.findUserByUsername(username);
    if (userDB) {
      console.log(userDB);
    }
  }
}
