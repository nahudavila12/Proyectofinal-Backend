import { Injectable } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { Connection } from 'typeorm';
import { seedDatabase } from './seeding';

@Injectable()
@Command({ name: 'seed', description: 'Seed the database with initial data' })
export class SeedCommand extends CommandRunner {
  constructor(private readonly connection: Connection) {
    super();
  }

  async run() {
    await seedDatabase(this.connection);
  }
}
