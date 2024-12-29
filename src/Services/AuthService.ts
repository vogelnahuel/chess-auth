import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDao } from '../Daos/AuthDao';

@Injectable()
export class AuthService {
    constructor(
        private readonly authDao: AuthDao,
        private readonly jwtService: JwtService,
    ) {}

    async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }> {
        const user = await this.authDao.findByEmail(email);

        if (!user || !(await user.validatePassword(password))) {
            throw new Error('Invalid credentials');
        }

        const payload = { userId: user.id };
        const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

        return { accessToken, refreshToken };
    }

    async validateToken(token: string): Promise<{ isValid: boolean; userId?: string }> {
        try {
            const decoded = this.jwtService.verify(token);
            return { isValid: true, userId: decoded.userId };
        } catch (error) {
            return { isValid: false };
        }
    }

    async refreshToken(refreshToken: string): Promise<{ newAccessToken: string; newRefreshToken: string }> {
        try {
            const decoded = this.jwtService.verify(refreshToken);
            const payload = { userId: decoded.userId };
            const newAccessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
            const newRefreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

            return { newAccessToken, newRefreshToken };
        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    }
}
