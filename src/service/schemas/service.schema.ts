import { Schema } from 'mongoose';

export const ServiceSchema = new Schema(
  {
    url: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: [String], required: true },
    imagesURL: { type: [String], required: true },
  },
  { timestamps: true },
);
