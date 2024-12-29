import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Role } from './RoleEntity';
import { Permission } from './PermissionEntity';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, nullable: false })
    name: string;

    @Column({ length: 100, nullable: false, unique: true })
    lastName: string;

    @Column({ length: 100, nullable: false })
    password: string;

    @Column({ length: 255, nullable: false })
    refreshToken: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ length: 255, unique: true, nullable: false })
    email: string;

    @Column({ length: 255, nullable: true })
    address: string;

    @Column({ length: 255, nullable: true })
    locationS3: string;

    @Column({ length: 255, nullable: true })
    verificationCode: string;

    @Column({ length: 255, nullable: true })
    expireVerificationCode: string;

    @ManyToOne(() => Role, (role) => role.users, { nullable: false })
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @ManyToMany(() => Permission, (permission) => permission.id)
    @JoinTable({
        name: 'user_permission',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'permission_id',
            referencedColumnName: 'id',
        },
    })
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

    getPassword(): string {
        return this.password;
    }

    getRefreshToken(): string {
        return this.refreshToken;
    }

    getLastName(): string {
        return this.lastName;
    }

    getIsActive(): boolean {
        return this.isActive;
    }

    getLocationS3(): string {
        return this.locationS3;
    }

    getVerificationCode(): string {
        return this.verificationCode;
    }

    getExpireVerificationCode(): string {
        return this.expireVerificationCode;
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

    setPassword(password: string): void {
        this.password = password;
    }

    setRefreshToken(refreshToken: string): void {
        this.refreshToken = refreshToken;
    }

    setIsActive(isActive: boolean): void {
        this.isActive = isActive;
    }

    setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    setLocationS3(locationS3: string): void {
        this.locationS3 = locationS3;
    }

    setVerificationCode(verificationCode: string): void {
        this.verificationCode = verificationCode;
    }

    setExpireVerificationCode(expireVerificationCode: string): void {
        this.expireVerificationCode = expireVerificationCode;
    }

    setRole(role: Role): void {
        this.role = role;
    }

    setPermissions(permissions: Permission[]): void {
        this.permissions = permissions;
    }
}
