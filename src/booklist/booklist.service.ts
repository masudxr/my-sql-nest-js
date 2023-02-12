import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booklist } from 'src/booklist/entities/list';
import { Repository } from 'typeorm';
import { CreateListDto } from './dto/create.list.dto';
import { UpdateListDto } from './dto/update.list.dto';

@Injectable()
export class BooklistService {
  constructor(
    @InjectRepository(Booklist) private listRepository: Repository<Booklist>,
  ) {}
  findAll() {
    return this.listRepository.find();
  }

  get(id: number) {
    return this.listRepository.findOne({
      relations: ['books'],
      where: {
        id: id,
      },
    });
  }

  async create(listDetails: CreateListDto) {
    const newList = this.listRepository.create({
      ...listDetails,
    });
    return this.listRepository.save(newList);
  }

  update(id: number, updateListDetails: UpdateListDto) {
    return this.listRepository.update({ id }, { ...updateListDetails });
  }

  delete(id: number) {
    return this.listRepository.delete({ id });
  }
  // find list and show the listed books//
  async findWithBooks(id: number) {
    const listWithBooks = await this.listRepository
      .createQueryBuilder('booklist')
      .leftJoinAndSelect('booklist.books', 'books')
      .where('booklist.id = :id', { id: id })
      .getOne();
    console.log(JSON.stringify(listWithBooks, null, 2));
    return listWithBooks;
  }
}
