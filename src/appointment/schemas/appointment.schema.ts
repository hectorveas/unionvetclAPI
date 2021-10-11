import { Schema } from 'mongoose';

export const AppointmentSchema = new Schema(
  {
    idUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    state: { type: String, default: 'pending' },
    observation: { type: Schema.Types.ObjectId, ref: 'Observation' },
  },
  { timestamps: true },
);
