import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { State } from '../interfaces/appointment.interface';

export class CreateAppointmentDTO {
  @IsString()
  @ApiProperty()
  readonly idUser: string;

  @IsDateString() 
  @IsNotEmpty()
  @ApiProperty()
  readonly startDate: Date;

  @IsDateString() 
  @IsNotEmpty()
  @ApiProperty()
  readonly endDate: Date;

  @ApiProperty()
  readonly state: State;
}

export class UpdateAppointmentDTO extends PartialType(CreateAppointmentDTO) {}
