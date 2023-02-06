import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/books/typeorm/entities/books';
import { CreateBookParams, UpdateBookParams } from 'src/typeorm/entities/types';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
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

  createBook(bookDetails: CreateBookParams) {
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
