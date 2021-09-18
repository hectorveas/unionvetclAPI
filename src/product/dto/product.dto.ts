import { IsString, IsNotEmpty, MaxLength, IsNumber, IsBoolean } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDTO {
  @IsString()
  @MaxLength(50, {
    message: 'input incorrecto ',
  })
  @ApiProperty()
  readonly imageUrl: string;

  @IsString()
  @MaxLength(30, {
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
  @MaxLength(500, {
    message: 'input incorrecto ',
  })
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsNumber()
  @ApiProperty()
  readonly stock: number;

  @IsBoolean()
  @ApiProperty()
  readonly sale: boolean;
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}
