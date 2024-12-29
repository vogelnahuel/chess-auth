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

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getAddress(): string {
        return this.address;
    }

    getRole(): Role {
        return this.role;
    }

    getPermissions(): Permission[] {
        return this.permissions;
    }

    setName(name: string): void {
        this.name = name;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    setAddress(address: string): void {
        this.address = address;
    }

    setRole(role: Role): void {
        this.role = role;
    }

    setPermissions(permissions: Permission[]): void {
        this.permissions = permissions;
    }
}
