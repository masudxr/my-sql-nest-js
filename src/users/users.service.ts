import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BooklistService } from 'src/booklist/booklist.service';
import { Booklist } from 'src/booklist/entities/list';
import { encodePassword } from 'src/uencrypt/bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { updateUserDto } from './dtos/UpdateUser.dto';
import { User } from './entities/user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Booklist) private listRepository: Repository<Booklist>,
    private bookListService: BooklistService,
  ) {}
  findUsers() {
    return this.userRepository.find();
  }

  findUser(id: number) {
    // this.bookListService.findList();
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  createUser(userDetails: CreateUserDto) {
    const password = encodePassword(userDetails.password);
    console.log('New Post Password:', password);
    const newUser = this.userRepository.create({
      ...userDetails,
      password,
      createAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }

  findUserByname(username: string) {
    return this.userRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  updateUser(id: number, updateUserDetails: updateUserDto) {
    return this.userRepository.update({ id }, { ...updateUserDetails });
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }

  // Relation many to many Start with list
  async addListForUser(uid: number, lid: number) {
    const list = await this.listRepository.findOne({
      where: {
        id: lid,
      },
    });
    console.log('Book', list);

    console.log('UserID:', uid);
    const user = await this.userRepository.findOne({
      where: {
        id: uid,
      },
    });
    console.log('user', user);
    list.user = user;
    await this.listRepository.save(list);
  }
  // Relation many to many end with list
}
