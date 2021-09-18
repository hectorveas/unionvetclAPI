import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreatePublicationDTO {
  @IsString()
  @MaxLength(100, {
    message: 'input incorrecto ',
  })
  @IsNotEmpty()
  @ApiProperty()
  readonly url: string;
}

export class UpdatePublicationDTO extends PartialType(CreatePublicationDTO) {}
