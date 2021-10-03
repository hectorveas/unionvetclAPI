import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateServiceDTO {
  @IsString()
  @MaxLength(100, {
    message: 'input incorrecto ',
  })
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;
  @IsString()
  @MaxLength(1000, {
    message: 'input incorrecto ',
  })
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string[];
  @IsString()
  @MaxLength(250, {
    message: 'input incorrecto ',
  })
  @IsNotEmpty()
  @ApiProperty()
  readonly imagesURL: string[];
}

export class UpdateServiceDTO extends PartialType(CreateServiceDTO) {}
