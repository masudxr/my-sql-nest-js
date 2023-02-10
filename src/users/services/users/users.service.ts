/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booklist } from 'src/booklist/typeorm/list';
import { Book } from 'src/books/typeorm/entities/books';
import { User } from 'src/typeorm/entities/user';
import { encodePassword } from 'src/uencrypt/bcrypt';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Booklist) private listRepository: Repository<Booklist>,
  ) {}
  findUsers() {
    return this.userRepository.find();
  }

  findUser(id: number) {
    return this.userRepository.find({
      where: {
        id: id,
      },
    });
  }

  createUser(userDetails: CreateUserParams) {
    const password = encodePassword(userDetails.password);
    console.log('New Post Password:', password);
    const newUser = this.userRepository.create({
      ...userDetails,
      password,
      createAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }

  findUserByUsername(username: string) {
    return this.userRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  updateUser(id: number, updateUserDetails: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...updateUserDetails });
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }

  findUserById(id: number) {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
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
