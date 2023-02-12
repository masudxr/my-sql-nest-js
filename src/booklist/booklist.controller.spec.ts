import { Test, TestingModule } from '@nestjs/testing';
import { BooklistController } from './booklist.controller';

describe('BooklistController', () => {
  let controller: BooklistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooklistController],
    }).compile();

    controller = module.get<BooklistController>(BooklistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
