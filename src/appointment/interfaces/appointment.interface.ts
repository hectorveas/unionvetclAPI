import { Document } from 'mongoose';
import { Observation } from 'src/observation/interfaces/observation.interface';

export interface Appointment extends Document {
  readonly idUser: string;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly state: string;
  readonly observation: Observation;
}
