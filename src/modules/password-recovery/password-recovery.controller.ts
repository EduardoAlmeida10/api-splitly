import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { RequestPasswordRecoveryDto } from './dto/request-password-recovery.dto';
import { PasswordRecoveryService } from './password-recovery.service';

@Controller('auth/password-recovery')
export class PasswordRecoveryController {
  constructor(
    private readonly passwordRecoveryService: PasswordRecoveryService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('request')
  requestRecovery(@Body() requestDto: RequestPasswordRecoveryDto) {
    return this.passwordRecoveryService.requestRecovery(requestDto);
  }
}
