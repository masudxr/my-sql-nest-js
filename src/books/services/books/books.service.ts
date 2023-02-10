import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booklist } from 'src/booklist/typeorm/list';
import { Book } from 'src/books/typeorm/entities/books';
import { CreateBookParams, UpdateBookParams } from 'src/books/typeorm/types';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @InjectRepository(Booklist) private listRepository: Repository<Booklist>,
  ) {}
  findBooks() {
    return this.bookRepository.find();
  }

  findBook(id: number) {
    return this.bookRepository.find({
      where: {
        id: id,
      },
    });
  }
  // marge code..connect many to many start
  async addBookToList(bookid: number, id: number) {
    const book = await this.bookRepository.findOne({
      where: {
        id: bookid,
      },
    });
    console.log('Book', book);

    console.log('listid:', id);
    const list = await this.listRepository.findOne({
      where: {
        id: id,
      },
    });
    // list.books = [book];
    console.log('list many to manybooklist', list);
    list.books.push(book);
    console.log('list many to manybooklist', list);
    await this.listRepository.save(list);
  }
  // marge code..connect many to many end

  // marge code..connect one to one/many start
  async addBookOne2One(id: number, listid: number) {
    const book = await this.bookRepository.findOne({
      where: {
        id: id,
      },
    });
    console.log('Get Book', book);
    console.log('listid inside addBookOne2One:', id);
    const list = await this.listRepository.findOne({
      where: {
        id: listid,
      },
    });
    console.log('Booklist List:', list);
    list.book = [book];
    await this.listRepository.save(list);
  }
  // marge code..connect one to one/many end

  async createBook(bookDetails: CreateBookParams) {
    const newBook = this.bookRepository.create({
      ...bookDetails,
      publishAt: new Date(),
    });
    return this.bookRepository.save(newBook);
  }

  findBookByBookname(name: string) {
    return this.bookRepository.findOne({
      where: {
        name: name,
      },
    });
  }
  updateBook(id: number, updateBookDetails: UpdateBookParams) {
    return this.bookRepository.update({ id }, { ...updateBookDetails });
  }

  deleteBook(id: number) {
    return this.bookRepository.delete({ id });
  }

  findBookById(id: number) {
    return this.bookRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}
