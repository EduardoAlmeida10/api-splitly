import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer, { type Transporter } from 'nodemailer';
import { passwordRecoveryTemplate } from './templates/password-recovery.template';

@Injectable()
export class MailService {
  private readonly transporter: Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.getOrThrow<string>('MAIL_HOST'),
      port: Number(this.configService.getOrThrow<string>('MAIL_PORT')),
      secure: false,

      auth: {
        user: this.configService.getOrThrow<string>('MAIL_USER'),
        pass: this.configService.getOrThrow<string>('MAIL_PASSWORD'),
      },
    });
  }

  async sendPasswordRecoveryCode(email: string, code: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: this.configService.getOrThrow<string>('MAIL_FROM'),
        to: email,
        subject: 'Código de recuperação de senha — Splitly',

        html: passwordRecoveryTemplate(code),
      });
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);

      throw new InternalServerErrorException(
        'Não foi possível enviar o e-mail de recuperação',
      );
    }
  }
}
