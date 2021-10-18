import { Schema } from 'mongoose';

export const VaccineSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    DateAplication: { type: Date, required: false },
    vaccineType: { type: String, required: false },
    dose: { type: String, required: false },
  },
  { timestamps: true },
);
