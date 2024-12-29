export default class Payload {
    id: number;

    roles: string[];

    permissions: string[];

    iat: number;

    exp: number;
}

export interface IPayload {
    id: number;
    role: string;
    permissions: string[];
}
