import mongoose from 'mongoose';
import { CarDto } from '../dto/car.dto';

export interface CarDocument extends Document, CarDto {}

export const CarSchema = new mongoose.Schema<CarDocument>({
  name: { type: String, required: true, unique: true },
  brand: String,
  year: Number,
  cost: Number,
});

export const carModelData = { name: 'Cars', schema: CarSchema };
