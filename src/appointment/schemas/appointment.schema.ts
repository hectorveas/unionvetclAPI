import { Schema } from 'mongoose';

export const AppointmentSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'Pet',
      required: true,
      autopopulate: { maxDepth: 2 },
    },
    userName: { type: String, required: false },
    userLastName: { type: String, required: false },
    userId: { type: String, required: false },
    state: { type: Number, default: 1 },
    block: { type: Number, required: false },
    date: { type: {day: Number, month: Number, year: Number}, required: true },
    observation: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Observation',
        required: false,
        autopopulate: { maxDepth: 2 },
      },
    ],
    responsableCancellation: { type: String, required: false },
    motiveCancellation: { type: String, required: false },
  },
  { timestamps: true },
);
AppointmentSchema.plugin(require('mongoose-autopopulate'));
