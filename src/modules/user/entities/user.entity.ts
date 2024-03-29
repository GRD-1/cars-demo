import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: String,
  salt: String,
  refreshToken: String,
});

export interface UserDocument extends Document {
  username: string;
  passwordHash: string;
  salt: string,
  refreshToken: string,
}

export const userModelData = { name: 'Users', schema: UserSchema };
