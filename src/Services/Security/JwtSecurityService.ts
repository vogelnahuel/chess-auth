import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import Payload, { IPayload } from '../../Models/Auth/Payload';

@Injectable()
export class JwtSecurityService {
    constructor(private readonly _jwtService: JwtService) {}

    async generateAccessToken(id: number, role: string, permission: string[]): Promise<string> {
        try {
            const payload: IPayload = { id, role, permissions: permission };
            const tokenExpiration = '8h';
            return this._jwtService.sign(payload, {
                expiresIn: tokenExpiration,
                privateKey: process.env.JWT_SECRET_KEY,
            });
        } catch (error) {
            console.error('JWT creation error');
            return null;
        }
    }

    async generateRefreshToken(id: number, role: string, permission: string[]): Promise<string> {
        try {
            const payload: IPayload = { id, role, permissions: permission };
            return this._jwtService.sign(payload, {
                privateKey: process.env.JWT_SECRET_KEY_REFRESH_TOKEN,
                expiresIn: '5w',
            });
        } catch (error) {
            console.error('JWT RefreshToken creation error');
            return null;
        }
    }

    async verifyRefreshToken(token: string): Promise<Payload> {
        return this._jwtService.verify(token, { secret: process.env.JWT_SECRET_KEY_REFRESH_TOKEN });
    }
}
