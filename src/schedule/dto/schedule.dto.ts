import { IsString, IsNotEmpty, MaxLength, IsDate, IsNumber } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Appointment } from 'src/appointment/interfaces/appointment.interface';

export class CreateScheduleDTO {

  @IsDate()
  @ApiProperty()
  readonly startDate: Date;
  @IsDate()
  @ApiProperty()
  readonly endDate: Date;
  @IsString()
  @ApiProperty()
  readonly month: string;
  @IsString()
  @ApiProperty()
  readonly year: string;
  @IsString()
  @ApiProperty()
  readonly day: string;
  @IsNumber()
  @ApiProperty()
  readonly maxAppointment: number;

}

export class UpdateScheduleDTO extends PartialType(CreateScheduleDTO) {}
