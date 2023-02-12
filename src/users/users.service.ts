import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BooklistService } from 'src/booklist/booklist.service';
import { Booklist } from 'src/booklist/entities/list';
import { encodePassword } from 'src/uencrypt/bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { User } from './entities/user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Booklist) private listRepository: Repository<Booklist>,
    private bookListService: BooklistService,
  ) {}
  findAll() {
    return this.userRepository.find();
  }

  get(id: number) {
    // this.bookListService.findList();
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  create(userDetails: CreateUserDto) {
    const password = encodePassword(userDetails.password);
    console.log('New Post Password:', password);
    const newUser = this.userRepository.create({
      ...userDetails,
      password,
      createAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }

  update(id: number, updateUserDetails: UpdateUserDto) {
    return this.userRepository.update({ id }, { ...updateUserDetails });
  }

  delete(id: number) {
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
