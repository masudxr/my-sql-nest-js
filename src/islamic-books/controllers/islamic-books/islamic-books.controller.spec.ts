import { Test, TestingModule } from '@nestjs/testing';
import { IslamicBooksController } from './islamic-books.controller';

describe('IslamicBooksController', () => {
  let controller: IslamicBooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IslamicBooksController],
    }).compile();

    controller = module.get<IslamicBooksController>(IslamicBooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
