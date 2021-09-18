import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateContactDTO {
  @IsString()
  @MaxLength(50, {
    message: 'input incorrecto ',
  })
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @MaxLength(30, {
    message: 'input incorrecto ',
  })
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @MaxLength(9, {
    message: 'input incorrecto ',
  })
  @IsNotEmpty()
  @ApiProperty()
  readonly phone: string;

  @IsString()
  @MaxLength(500, {
    message: 'input incorrecto ',
  })
  @IsNotEmpty()
  @ApiProperty()
  readonly message: string;
}

export class UpdateContactDTO extends PartialType(CreateContactDTO) {}
