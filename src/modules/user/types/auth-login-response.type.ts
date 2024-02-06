import { AuthType } from './auth.type';

export class AuthLoginResponse implements AuthType {
    id: number;

    login: string;

    token: string;
}
