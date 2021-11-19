import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { State } from '../interfaces/appointment.interface';
import { Pet } from 'src/pet/interfaces/pet.interface';
import { Observation } from 'src/observation/interfaces/observation.interface';

export class CreateAppointmentDTO {
  @ApiProperty()
  readonly patient: Pet;

  @ApiProperty()
  readonly userName: string;

  @ApiProperty()
  readonly userLastName: string;

  @ApiProperty()
  readonly userId: string;

  @ApiProperty()
  readonly state: State;

  @ApiProperty()
  readonly block: number;

  @ApiProperty()
  readonly date: {
    day: number;
    month: number;
    year: number;
  };

  @ApiProperty()
  readonly observation: Observation;
}

export class UpdateAppointmentDTO extends PartialType(CreateAppointmentDTO) {

  @ApiProperty()
  readonly responsableCancellation: string;

  @ApiProperty()
  readonly motiveCancellation: string;
}
