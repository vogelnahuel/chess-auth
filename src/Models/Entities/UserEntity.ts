import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Role } from './RoleEntity';
import { Permission } from './PermissionEntity';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, nullable: false })
    name: string;

    @Column({ length: 255, unique: true, nullable: false })
    email: string;

    @Column({ length: 255, nullable: true })
    address: string;

    @ManyToOne(() => Role, (role) => role.users, { nullable: false })
    role: Role;

    @ManyToMany(() => Permission, (permission) => permission.users)
    @JoinTable()
    permissions: Permission[];
}
