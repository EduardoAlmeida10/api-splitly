import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',

  host: configService.getOrThrow<string>('DB_HOST'),

  port: configService.getOrThrow<number>('DB_PORT'),

  username: configService.getOrThrow<string>('DB_USER'),

  password: configService.getOrThrow<string>('DB_PASSWORD'),

  database: configService.getOrThrow<string>('DB_NAME'),

  autoLoadEntities: true,

  synchronize: false,
});
