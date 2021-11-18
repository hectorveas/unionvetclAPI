import { IsString, IsNumber, IsDateString, IsOptional, IsDate } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreatePetDTO {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly age: number;

  @IsString()
  @ApiProperty()
  readonly breed: string;

  @IsString()
  @ApiProperty()
  readonly species: string;

  @IsString()
  @ApiProperty()
  readonly color: string;

  @ApiProperty()
  readonly chipNumber: string;

  @IsString()
  @ApiProperty()
  readonly gender: string;

  @ApiProperty()
  readonly dateBirth: Date;
}

export class UpdatePetDTO extends PartialType(CreatePetDTO) {}
