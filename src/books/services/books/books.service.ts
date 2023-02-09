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
  // marge code..connect one to one start
  async addBookToList(id: number, listid: number) {
    const getbook = await this.bookRepository.find({
      where: {
        id: id,
      },
    });
    console.log('Get Book', getbook);
    console.log('listid inside addbooktolist:', listid);
    const list = await this.listRepository.findOne({
      where: {
        listid: listid,
      },
    });
    console.log('Booklist List:', list);
    const savedBook = await this.bookRepository.save(getbook);
    console.log('savedBook', savedBook);
    list.id = savedBook;
    await this.listRepository.save(list);
  }
  // marge code..connect one to one end

  async createBook(bookDetails: CreateBookParams) {
    const newBook = this.bookRepository.create({
      ...bookDetails,
      publishAt: new Date(),
    });
    return this.bookRepository.save(newBook);
  }

  findBookByBookname(bookname: string) {
    return this.bookRepository.findOne({
      where: {
        bookname: bookname,
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
