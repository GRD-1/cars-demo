import { UserDto } from '../dto/user.dto';

type WithoutPasswordHash = Omit<UserDto, 'password'>;
export interface UserResponseType extends WithoutPasswordHash {
    token: string;
}
