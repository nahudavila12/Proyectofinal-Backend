import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';


dotenvConfig();

const config = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432, 
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  synchronize: true, 
  logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.js,.ts}'],
  dropSchema: false
};

export default registerAs('typeOrm', () => config);

export const conectionSource = new DataSource(config as DataSourceOptions);