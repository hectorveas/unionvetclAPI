import { Document } from 'mongoose';
import { Vaccine } from 'src/vaccine/interfaces/vaccine.interface';

export interface Observation extends Document {
  readonly idPet: string;
  readonly doctor: string;
  readonly motive: string;
  readonly weight: number;
  readonly preDiagnostic: string;
  readonly anamnesis: string;
  readonly diagnostic: string;
  readonly treatment: string;
  readonly vaccines: [Vaccine];
}
