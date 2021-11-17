import { Schema } from 'mongoose';

export const ServiceSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: [String], required: true },
    imageOne: { type: String, required: false },
    imageTwo: { type: String, required: false },
    imageThree: { type: String, required: false },
    imageFour: { type: String, required: false },
  },
  { timestamps: true },
);
