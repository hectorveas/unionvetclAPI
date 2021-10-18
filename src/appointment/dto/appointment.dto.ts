import { IsString, IsNotEmpty, MaxLength, IsDate } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { State } from '../interfaces/appointment.interface';

export class CreateAppointmentDTO {
  @IsString()
  @ApiProperty()
  readonly idUser: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  readonly startDate: Date;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  readonly endDate: Date;

  @ApiProperty()
  readonly state: State;
}

export class UpdateAppointmentDTO extends PartialType(CreateAppointmentDTO) {}
