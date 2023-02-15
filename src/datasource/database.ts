import 'reflect-metadata';
import { Booklist } from 'src/booklist/entities/list';
import { Book } from 'src/books/entities/books';
import { User } from 'src/users/entities/user';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'fun_db',
  entities: [User, Book, Booklist],
  synchronize: true,
});

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => console.log(error));
