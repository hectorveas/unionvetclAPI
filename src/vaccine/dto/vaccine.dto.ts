import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateVaccineDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly dateAplication: Date;

  @IsString()
  @ApiProperty()
  readonly vaccineType: string;

  @IsString()
  @ApiProperty()
  readonly dose: string;
}

export class UpdateVaccineDTO extends PartialType(CreateVaccineDTO) {}
