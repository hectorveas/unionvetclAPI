import { Schema } from 'mongoose';

export const ScheduleSchema = new Schema(
  {
    startDate: Date,
    endDate: Date,
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    day: { type: Number, required: true },
    maxAppointment: { type: Number, required: true },
    appointments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Appointment',
        required: false,
        autopopulate: { maxDepth: 2 },
      },
    ],
  },
  { timestamps: true },
);
