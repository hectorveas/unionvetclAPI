import {
  IsString,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Appointment } from 'src/appointment/interfaces/appointment.interface';

export class CreateScheduleDTO {
  @ApiProperty()
  readonly startDate: Date;
  
  @ApiProperty()
  readonly endDate: Date;

  @ApiProperty()
  readonly month: number;

  @ApiProperty()
  readonly year: number;

  @ApiProperty()
  readonly day: number;

  @IsNumber()
  @ApiProperty()
  readonly maxAppointment: number;
}

export class UpdateScheduleDTO extends PartialType(CreateScheduleDTO) {}
