import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateObservationDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly idPet: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly doctor: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly motive: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly weight: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly preDiagnostic: string;

  @IsString()
  @ApiProperty()
  readonly anamnesis: string;

  @IsString()
  @ApiProperty()
  readonly diagnostic: string;

  @IsString()
  @ApiProperty()
  readonly treatment: string;
}

export class UpdateObservationDTO extends PartialType(CreateObservationDTO) {}
