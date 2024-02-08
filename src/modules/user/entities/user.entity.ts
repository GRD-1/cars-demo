import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
  login: { type: String, required: true, unique: true },
  passwordHash: String,
});

export interface UserDocument extends Document {
  login: string;
  passwordHash: string;
}

export const userModelData = { name: 'Users', schema: UserSchema };
