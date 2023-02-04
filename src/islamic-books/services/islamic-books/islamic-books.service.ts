import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateIslamicBookParams,
  UpdateIslamicBookParams,
} from 'src/books/typeorm/types';
import { IslamicBook } from 'src/islamic-books/typeorm/islamic-book';
import { Repository } from 'typeorm';

@Injectable()
export class IslamicBooksService {
  constructor(
    @InjectRepository(IslamicBook)
    private islamicbookRepository: Repository<IslamicBook>,
  ) {}
  findIslamicBooks() {
    return this.islamicbookRepository.find();
  }

  findIslamicBook(id: number) {
    return this.islamicbookRepository.find({
      where: {
        id: id,
      },
    });
  }

  createIslamicBook(islamicbookDetails: CreateIslamicBookParams) {
    const newislamicBook = this.islamicbookRepository.create({
      ...islamicbookDetails,
    });
    return this.islamicbookRepository.save(newislamicBook);
  }
  findIslamicBookByBookname(bookname: string) {
    return this.islamicbookRepository.findOne({
      where: {
        bookname: bookname,
      },
    });
  }
  updateIslamicBook(
    id: number,
    updateIslamicBookDetails: UpdateIslamicBookParams,
  ) {
    return this.islamicbookRepository.update(
      { id },
      { ...updateIslamicBookDetails },
    );
  }

  deleteIslamicBook(id: number) {
    return this.islamicbookRepository.delete({ id });
  }

  findIslamicBookById(id: number) {
    return this.islamicbookRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}
