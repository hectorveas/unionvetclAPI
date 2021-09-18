import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateTipDTO {
  @IsString()
  @MaxLength(50, {
    message: 'input incorrecto ',
  })
  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;

  @IsString()
  @MaxLength(50, {
    message: 'input incorrecto ',
  })
  @IsNotEmpty()
  @ApiProperty()
  readonly imageUrl: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly content: string;
}

export class UpdateTipDTO extends PartialType(CreateTipDTO) {}
