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

  @ApiProperty()
  readonly imageOne: string;

  @ApiProperty()
  readonly imageTwo: string;

  @ApiProperty()
  readonly imageThree: string;

  @ApiProperty()
  readonly imageFour: string;


}

export class UpdateServiceDTO extends PartialType(CreateServiceDTO) {}
