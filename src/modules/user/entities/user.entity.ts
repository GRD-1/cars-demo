import mongoose from 'mongoose';
import { UserDto } from '../dto/user.dto';

export interface UserDocument extends Document, UserDto {}

export const UserSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  passwordHash: String,
});

export const userModelData = { name: 'Users', schema: UserSchema };
