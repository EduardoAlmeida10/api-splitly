import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { randomInt } from 'node:crypto';
import { IsNull, Repository } from 'typeorm';

import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';
import { RequestPasswordRecoveryDto } from './dto/request-password-recovery.dto';
import { PasswordRecovery } from './entities/password-recovery.entity';

@Injectable()
export class PasswordRecoveryService {
  constructor(
    @InjectRepository(PasswordRecovery)
    private readonly passwordRecoveryRepository: Repository<PasswordRecovery>,

    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  async requestRecovery(
    requestDto: RequestPasswordRecoveryDto,
  ): Promise<{ message: string }> {
    const email = requestDto.email.toLowerCase().trim();

    const user = await this.usersService.findByEmail(email);

    const messageResponse = {
      message: 'Código de verificação enviado para o e-mail informado.',
    };

    if (!user) {
      return messageResponse;
    }

    await this.invalidatePreviousRecoveries(user.id);

    const code = randomInt(100000, 1000000).toString();

    const codeHash = await bcrypt.hash(code, 10);

    const expirationMinutes = Number(
      this.configService.get<string>('PASSWORD_RECOVERY_EXPIRES_MINUTES') ?? 15,
    );

    const expiresAt = new Date(Date.now() + expirationMinutes * 60 * 1000);

    const recovery = this.passwordRecoveryRepository.create({
      userId: user.id,
      codeHash,
      expiresAt,
      attempts: 0,
      verifiedAt: null,
      usedAt: null,
    });

    await this.passwordRecoveryRepository.save(recovery);

    await this.mailService.sendPasswordRecoveryCode(user.email, code);

    return messageResponse;
  }

  private async invalidatePreviousRecoveries(userId: string): Promise<void> {
    const activeRecoveries = await this.passwordRecoveryRepository.find({
      where: {
        userId,
        usedAt: IsNull(),
      },
    });

    if (activeRecoveries.length === 0) {
      return;
    }

    const now = new Date();

    for (const recovery of activeRecoveries) {
      recovery.usedAt = now;
    }

    await this.passwordRecoveryRepository.save(activeRecoveries);
  }
}
