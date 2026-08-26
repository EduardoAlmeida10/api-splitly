import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RequestPasswordRecoveryDto {
  @ApiProperty({
    example: 'usuario@email.com',
    description: 'E-mail associado à conta',
  })
  @IsEmail(
    {},
    {
      message: 'Informe um e-mail válido',
    },
  )
  email!: string;
}
