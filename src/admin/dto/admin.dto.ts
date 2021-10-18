import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateAdminDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(0, {
    message: 'input incorrecto',
  })
  @MaxLength(50, {
    message: 'input incorrecto ',
  })
  @ApiProperty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(0, {
    message: 'input incorrecto',
  })
  @MaxLength(50, {
    message: 'input incorrecto ',
  })
  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  readonly role: string;
}

export class UpdateAdminDTO extends PartialType(CreateAdminDTO) {}
