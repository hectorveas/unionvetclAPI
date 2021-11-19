import { IsString, IsNotEmpty, MaxLength, IsBoolean } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateContactDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly fullName: string;

  @IsString()
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
  @MaxLength(400, {
    message: 'input incorrecto ',
  })
  @IsNotEmpty()
  @ApiProperty()
  readonly message: string;

}

export class UpdateContactDTO extends PartialType(CreateContactDTO) {
  @IsBoolean()
  @ApiProperty()
  readonly isReaded: boolean;

  @IsString()
  @MaxLength(400, {
    message: 'input incorrecto ',
  })
  @ApiProperty()
  readonly response: string;
}
