import { UserDto } from '../dto/user.dto';

type WithoutPasswordHash = Omit<UserDto, 'password'>;
export interface UserResponseType extends WithoutPasswordHash {
    _id: string;
    accessToken: string;
    refreshToken: string;
}
