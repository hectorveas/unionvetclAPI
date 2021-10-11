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

  @IsNotEmpty()
  @ApiProperty()
  readonly description: string[];

  @IsNotEmpty()
  @ApiProperty()
  readonly imagesURL: string[];
}

export class UpdateServiceDTO extends PartialType(CreateServiceDTO) {}
