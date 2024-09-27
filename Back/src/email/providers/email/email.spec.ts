import { Test, TestingModule } from '@nestjs/testing';
import { Email } from './email';

describe('Email', () => {
  let provider: Email;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Email],
    }).compile();

    provider = module.get<Email>(Email);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
