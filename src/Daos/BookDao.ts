import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../Models/Entities/BookEntity';
import { Repository } from 'typeorm';

@Injectable()
export class BookDao {
    constructor(@InjectRepository(Book) private readonly _bookRepository: Repository<Book>) {}

    // Guardar un libro
    async save(book: Book): Promise<Book> {
        return this._bookRepository.save(book);
    }

    // Obtener todos los libros
    async findAll(): Promise<Book[]> {
        return this._bookRepository.find();
    }
}
