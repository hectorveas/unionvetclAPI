import { IsString, IsNotEmpty, MaxLength, IsDate } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

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

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly state: string;
}

export class UpdateAppointmentDTO extends PartialType(CreateAppointmentDTO) {}
