import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDTO {

  @ApiProperty()
  readonly imageUrl: string;

  @IsString()
  @MaxLength(50, {
    message: 'input incorrecto ',
  })
  @IsNotEmpty()
  @ApiProperty()
  readonly brand: string;

  @IsString()
  @MaxLength(30, {
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
  readonly description: string;

  @IsString()
  @MaxLength(50, {
    message: 'input incorrecto ',
  })
  @IsNotEmpty()
  @ApiProperty()
  readonly category: string;

  @IsNumber()
  @ApiProperty()
  readonly stock: number;
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {

  @IsBoolean()
  @ApiProperty()
  readonly sale: boolean;
}
