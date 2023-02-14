import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booklist } from 'src/booklist/entities/list';
import { Book } from 'src/books/entities/books';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/createBook.dto';
import { UpdateBookDto } from './dto/updateBook.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @InjectRepository(Booklist) private listRepository: Repository<Booklist>,
  ) {}
  findAll() {
    return this.bookRepository.find();
  }

  get(id: number) {
    return this.bookRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  //  many to many
  async addBookToList(bookid: number, id: number) {
    const book = await this.bookRepository.findOne({
      where: {
        id: bookid,
      },
    });
    console.log('Book', book);
    console.log('listid:', id);
    const list = await this.listRepository.findOne({
      relations: ['books'], //---left Join list and books//
      where: {
        id: id,
      },
    });
    console.log('booklist before', list);
    if (list.books) {
      list.books.push(book);
      console.log('hello defined');
    } else {
      list.books = [book];
      console.log('hello undefined');
    }
    await this.listRepository.save(list);
  }
  // removed book from list which was created by many to many relation //
  async deleteFromList(bid: number, lid: number) {
    const deleteBookFromList = await this.listRepository.findOne({
      relations: ['books'],
      where: {
        id: lid,
      },
    });
    console.log('List with books:', deleteBookFromList.books);
    deleteBookFromList.books = deleteBookFromList.books.filter((book) => {
      bid !== book.id;
    });
    await this.listRepository.save(deleteBookFromList);
  }

  // marge code..connect one to one/many start
  // async addBookOne2One(id: number, listid: number) {
  //   const book = await this.bookRepository.findOne({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   console.log('Get Book', book);
  //   console.log('listid inside addBookOne2One:', id);
  //   const list = await this.listRepository.findOne({
  //     where: {
  //       id: listid,
  //     },
  //   });
  //   console.log('Booklist List:', list);
  //   // list.book = [book];
  //   await this.listRepository.save(list);
  // }
  // marge code..connect one to one/many end

  async create(bookDetails: CreateBookDto) {
    const newBook = this.bookRepository.create({
      ...bookDetails,
      publishAt: new Date(),
    });
    return this.bookRepository.save(newBook);
  }

  update(id: number, updateBookDetails: UpdateBookDto) {
    return this.bookRepository.update({ id }, { ...updateBookDetails });
  }

  delete(id: number) {
    return this.bookRepository.delete({ id });
  }
}
