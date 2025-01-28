import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { BookService } from '../Services/BookService';
import { Book } from '../Models/Entities/BookEntity';
import { book as BookProto } from '../Protos/Book';

@Controller()
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @GrpcMethod('BookService', 'CreateBook')
    async createBook(data: BookProto.CreateBookRequest) {
        const book = await this.bookService.create(data);
        return {
            message: 'Book created successfully',
            book: this.toProtoBook(book),
        };
    }

    @GrpcMethod('BookService', 'GetBooks')
    async getBooks() {
        const books = await this.bookService.findAll();
        return { books: books.map((book: any) => this.toProtoBook(book)) };
    }

    private toProtoBook(book: Book) {
        return {
            id: book?.id,
            title: book?.title,
            description: book?.description,
            image: book?.image,
        };
    }
}
