import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    rut: { type: String, required: false },
    isVerifed: { type: Boolean, default: false },
    LastConection: { type: Date, required: false, default: Date.now },
    pets: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Pet',
        required: false,
        autopopulate: { maxDepth: 2 },
      },
    ],
    Appointments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Appointment',
        required: false,
        autopopulate: { maxDepth: 2 },
      },
    ],
    role: { type: String, required: true, default: 'user' },
  },
  { timestamps: true },
);
UserSchema.plugin(require('mongoose-autopopulate'));
