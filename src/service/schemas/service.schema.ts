import { Schema } from 'mongoose';

export const ServiceSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: [String], required: true },
    imagesURL: { type: [String], required: true },
  },
  { timestamps: true },
);
