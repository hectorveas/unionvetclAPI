import { Schema } from 'mongoose';

export const ProductSchema = new Schema(
  {
    imageUrl: { type: String, required: false },
    brand: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, default: 0 },
    sale: { type: Boolean, default: false },
    category: { type: String, required: false  },
  },
  { timestamps: true },
);
