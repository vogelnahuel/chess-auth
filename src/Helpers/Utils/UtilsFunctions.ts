import { createHmac } from 'node:crypto';

export default class UtilsFunctions {
    public static async generateNumber(seed?: string): Promise<number> {
        if (!seed) seed = Math.floor(Math.random() * 1000000).toString();

        const hash = createHmac('md5', seed).digest('hex');
        const numero = parseInt(hash.substr(0, 6), 16) % 1000000;

        return numero;
    }
}
