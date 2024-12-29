import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from './UserEntity';

@Entity('permission')
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, nullable: false })
    name: string;

    @ManyToMany(() => User, (user) => user.permissions)
    @JoinTable({
        joinColumn: { name: 'permission_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
    })
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
