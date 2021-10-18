import { Document } from 'mongoose';
import { Appointment } from 'src/appointment/interfaces/appointment.interface';
import { Pet } from 'src/pet/interfaces/pet.interface';

export interface User extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  password: string;
  readonly address: string;
  readonly phone: string;
  readonly rut: string;
  readonly isVerifed: boolean;
  readonly LastConection: Date;
  readonly pets: Pet[];
  readonly Appointments: Appointment[];
  readonly role: string;
}
