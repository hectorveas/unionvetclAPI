import { Schema } from 'mongoose';

export const PetSchema = new Schema(
  {
    name: { type: String, required: true},
    age: { type: Number, required: true },
    breed: { type: String, required: false },
    species: { type: String, required: false },
    color: { type: String, required : false },
    chipNumber: { type: String, required : false },
    gender: { type: String, required: true },
    dateBirth: {tyoe: Date, required: false},
    vaccinationHistory: { type: Schema.Types.ObjectId, ref: 'Vaccine' },
    ObservationHistory: { type: Schema.Types.ObjectId, ref: 'Observation' },
  },
  { timestamps: true },
);
