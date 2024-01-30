import { UserType } from './user.type';

export class AuthLoginResponse implements UserType {
    id: number;

    login: string;

    token: string;
}
