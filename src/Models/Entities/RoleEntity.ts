import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './UserEntity';

@Entity('role')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, nullable: false })
    name: string;

    @OneToMany(() => User, (user) => user.role)
    users: User[];

    getName(): string {
        return this.name;
    }

    getUsers(): User[] {
        return this.users;
    }

    setName(name: string): void {
        this.name = name;
    }

    setUsers(users: User[]): void {
        this.users = users;
    }
}
