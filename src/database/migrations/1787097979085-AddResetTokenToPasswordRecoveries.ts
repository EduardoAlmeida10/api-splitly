import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddResetTokenToPasswordRecoveries1787097979085 implements MigrationInterface {
  name = 'AddResetTokenToPasswordRecoveries1787097979085';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "password_recoveries" ADD "reset_token_hash" character varying(64)`,
    );
    await queryRunner.query(
      `ALTER TABLE "password_recoveries" ADD "reset_token_expires_at" TIMESTAMP WITH TIME ZONE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "password_recoveries" DROP COLUMN "reset_token_expires_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "password_recoveries" DROP COLUMN "reset_token_hash"`,
    );
  }
}
