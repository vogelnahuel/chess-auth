import { Injectable } from '@nestjs/common';
import { BookDao } from '../Daos/BookDao';
import { Book } from '../Models/Entities/BookEntity';
import { BookProto } from '../Protos/BookProto';

@Injectable()
export class BookService {
    constructor(private readonly _bookDao: BookDao) {}

    // Método para crear un libro
    async create(body: BookProto.CreateBookRequest): Promise<Book> {
        const book: Book = new Book();
        book.setTitle(body.title);
        book.setDescription(body.description);
        book.setImage(body.image);

        const resultBook = await this._bookDao.save(book);
        return resultBook;
    }

    // Método para obtener todos los libros
    async findAll() {
        const books: Book[] = await this._bookDao.findAll();
        if (!books || books.length === 0) {
            return null;
        }
        return books;
    }
}
