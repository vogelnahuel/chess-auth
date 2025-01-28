import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('book')
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, nullable: false })
    title: string;

    @Column({ length: 100, nullable: false })
    description: string;

    @Column({ length: 100, nullable: false })
    image: string;

    getTitle(): string {
        return this.title;
    }

    getDescription(): string {
        return this.description;
    }

    getImage(): string {
        return this.image;
    }

    setTitle(title: string): void {
        this.title = title;
    }

    setDescription(description: string): void {
        this.description = description;
    }

    setImage(image: string): void {
        this.image = image;
    }
}
