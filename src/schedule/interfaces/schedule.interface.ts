import { Document } from 'mongoose';
import { Appointment } from 'src/appointment/interfaces/appointment.interface';

export interface Schedule extends Document {
  readonly startDate: Date;
  readonly endDate: Date;
  readonly month: string;
  readonly year: string;
  readonly day: string;
  readonly maxAppointment: number;
  readonly appointments: [Appointment];
}
