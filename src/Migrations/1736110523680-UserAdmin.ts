import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAdmin1736110523680 implements MigrationInterface {
    name = 'UserAdmin1736110523680';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO role (name, description)
            VALUES ('ADMIN', 'Administrator role'),
                   ('USER', 'Regular user role');
        `);

        // Insertar permisos
        await queryRunner.query(`
            INSERT INTO permission (name, description)
            VALUES ('CREATE_USER', 'Permission to create users'),
                   ('DELETE_USER', 'Permission to delete users'),
                   ('VIEW_USER', 'Permission to view users'),
                   ('UPDATE_USER', 'Permission to update users');
        `);

        // Crear usuarios
        await queryRunner.query(`
                    INSERT INTO user (name, lastName, email, password, refreshToken, isActive, role_id)
                    VALUES ('John', 'Doe', 'testing@gmail.com', '$2y$10$OQoOG6rqBeOH4PCd0lqUX.QnHiXN5QxWnmaGtqxnHnxTCX79jaz7C', 'refreshToken', true,
                            (SELECT id FROM role WHERE name = 'ADMIN'));
                `);

        // Asignar permisos a roles
        await queryRunner.query(`
            INSERT INTO user_permission (user_id, permission_id)
            SELECT
                (SELECT id FROM user WHERE email = 'testing@gmail.com'),
                id
            FROM permission;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Eliminar asignaciones de permisos a roles
        await queryRunner.query(`
                    DELETE FROM user_permission WHERE user_id = (SELECT id FROM user WHERE email = 'testing@gmail.com');
                `);
        // Eliminar usuarios
        await queryRunner.query(`
            DELETE FROM user WHERE email = 'testing@gmail.com';
        `);

        // Eliminar permisos
        await queryRunner.query(`
            DELETE FROM permission WHERE name IN ('CREATE_USER', 'DELETE_USER', 'VIEW_USER', 'UPDATE_USER');
        `);

        // Eliminar roles
        await queryRunner.query(`
            DELETE FROM role WHERE name IN ('ADMIN', 'USER');
        `);
    }
}
