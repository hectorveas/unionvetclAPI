import { IsString, IsNotEmpty, MaxLength, MinLength, IsBoolean, IsDate } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Pet } from 'src/pet/interfaces/pet.interface';
import { Appointment } from 'src/appointment/interfaces/appointment.interface';

export class CreateUserDTO {

  @IsString()
  @IsNotEmpty()
  @MinLength(0, {
    message: 'input incorrecto',
  })
  @MaxLength(50, {
    message: 'input incorrecto ',
  })
  @ApiProperty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(0, {
    message: 'input incorrecto',
  })
  @MaxLength(50, {
    message: 'input incorrecto ',
  })
  @ApiProperty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(0, {
    message: 'input incorrecto',
  })
  @MaxLength(100, {
    message: 'input incorrecto ',
  })
  @ApiProperty()
  readonly address: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(0, {
    message: 'input incorrecto',
  })
  @MaxLength(12, {
    message: 'input incorrecto ',
  })
  @ApiProperty()
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(0, {
    message: 'input incorrecto',
  })
  @MaxLength(10, {
    message: 'input incorrecto ',
  })
  @ApiProperty()
  readonly rut: string;

  @ApiProperty()
  readonly pets: Pet[];

  @ApiProperty()
  readonly Appointments: Appointment[];

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

}


export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
