/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booklist } from 'src/booklist/typeorm/list';
import { CreateListParams, UpdateListParams } from 'src/booklist/typeorm/types';
import { BooksService } from 'src/books/services/books/books.service';
import { Book } from 'src/books/typeorm/entities/books';
import { CreateBookParams } from 'src/books/typeorm/types';
import { Repository } from 'typeorm';

@Injectable()
export class BooklistService {
  bookRepository: Repository<Book>;
  constructor(
    @InjectRepository(Booklist) private listRepository: Repository<Booklist>,
  ) {}
  findLists() {
    return this.listRepository.find();
  }

  findList(id: number) {
    return this.listRepository.find({
      where: {
        id: id,
      },
    });
  }

  createList(listDetails: CreateListParams) {
    const newList = this.listRepository.create({
      ...listDetails,
    });
    return this.listRepository.save(newList);
  }
  // findListByBookname(listname: string) {
  //   return this.listRepository.findOne({
  //     where: {
  //       name: name,
  //     },
  //   });
  // }
  updateList(id: number, updateListDetails: UpdateListParams) {
    return this.listRepository.update({ id }, { ...updateListDetails });
  }

  deleteList(id: number) {
    return this.listRepository.delete({ id });
  }

  findListById(id: number) {
    return this.listRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async createBookProfile(id: number, createbookDetails: CreateListParams) {
    const newBookList = await this.listRepository.findOne({
      where: {
        id: id,
      },
    });
    console.log('new booklist', newBookList);
    // console.log('create book details:', createbookDetails);
    // const newBook = this.bookRepository.create({ ...createbookDetails });
    // console.log('new Book last entry', newBook);
    // console.log('new Book last entry bookname:', newBook.bookname);
    // const savedBook = await this.listRepository.save(newBook);
    // console.log('saved Book:', savedBook);
    // newBookList.book = savedBook.;
  }
  // -----------------------------------
  // async createBookProfile(id: number, createbookDetails: CreateBookParams) {
  //   const newBookList = await this.listRepository.findOneBy({ id });
  //   console.log('new book', newBookList);
  //   if (!newBookList)
  //     throw new HttpException(
  //       'Book not found. Cannot create Book Profile',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   const newBook = this.bookRepository.create(createbookDetails);
  //   const savedBook = await this.listRepository.save(newBook);
  //   newBookList.book = savedBook;
  //   return this.bookRepository.save(newBookList);
  // }
}
