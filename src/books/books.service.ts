import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booklist } from 'src/booklist/entities/list';
import { Book } from 'src/books/entities/books';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/createBook.dto';
import { updateBookDto } from './dto/updateBook.dto';

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
    return this.bookRepository.findOne({
      where: {
        id: id,
      },
    });
  }
  // find list and show the listed books//
  async findList(id: number) {
    console.log('get id:', id);
    // const bookWithList = await AppDataSource.getRepository(Booklist)
    // .createQueryBuilder('list')
    // .leftJoinAndSelect('list.books', 'books')
    // .getMany();
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
    list.books = [book];
    console.log('list many to manybooklist', list);
    // list.books.push(book);
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
    // list.book = [book];
    await this.listRepository.save(list);
  }
  // marge code..connect one to one/many end

  async createBook(bookDetails: CreateBookDto) {
    const newBook = this.bookRepository.create({
      ...bookDetails,
      publishAt: new Date(),
    });
    return this.bookRepository.save(newBook);
  }

  findBookByname(name: string) {
    return this.bookRepository.findOne({
      where: {
        name: name,
      },
    });
  }
  updateBook(id: number, updateBookDetails: updateBookDto) {
    return this.bookRepository.update({ id }, { ...updateBookDetails });
  }

  deleteBook(id: number) {
    return this.bookRepository.delete({ id });
  }
}
