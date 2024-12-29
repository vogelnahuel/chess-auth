import * as bcrypt from 'bcrypt';

export default class PasswordUtils {
    static async getEncryptData(data: string): Promise<string> {
        try {
            const salt = await bcrypt.genSalt(10);
            data = bcrypt.hashSync(data, salt);
            return data;
        } catch (e) {
            throw new Error('Bcrypt generate password error');
        }
    }

    static async getEncryptCompare(data: string, encryptData: string): Promise<boolean> {
        try {
            const dataValidation = await bcrypt.compare(data, encryptData);
            if (!dataValidation) {
                return false;
            }
            return true;
        } catch (e) {
            console.log('e', e);
            throw new Error('Bcrypt compare error');
        }
    }
}
